#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
import shutil
import unicodedata
import zipfile
from pathlib import Path

import pandas as pd
from PIL import Image

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.bmp', '.tif', '.tiff'}


def normalize(text: str) -> str:
    text = unicodedata.normalize('NFKD', str(text or ''))
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower().replace('ı', 'i')
    return re.sub(r'[^a-z0-9]+', '', text)


def safe_filename(text: str) -> str:
    text = unicodedata.normalize('NFKD', str(text or ''))
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    text = re.sub(r'[^A-Za-z0-9_-]+', '_', text).strip('_')
    return text[:100] or 'product'


def score_match(product_key: str, product_name: str, filename: str) -> int:
    file_key = normalize(Path(filename).stem)
    key = normalize(product_key)
    name = normalize(product_name)
    if key and (file_key == key or key in file_key):
        return 1000 + len(key)
    if name and (file_key == name or name in file_key):
        return 900 + len(name)
    key_tokens = [t for t in re.split(r'[_\-\s]+', str(product_key or '')) if t]
    token_hits = sum(1 for token in key_tokens if normalize(token) and normalize(token) in file_key)
    return token_hits * 10


def convert_to_jpg(source: Path, destination: Path) -> None:
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        image.save(destination, 'JPEG', quality=92, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(description='Match local menu images to products from an XLSX file')
    parser.add_argument('--menu', required=True, help='Path to yandex_menu_tr_cleaned.xlsx')
    parser.add_argument('--images', required=True, help='Folder containing local product images')
    parser.add_argument('--out', default='yandex_images_package', help='Output folder')
    args = parser.parse_args()

    menu_path = Path(args.menu).expanduser().resolve()
    images_dir = Path(args.images).expanduser().resolve()
    out_dir = Path(args.out).expanduser().resolve()
    prepared_dir = out_dir / 'images_for_yandex'
    out_dir.mkdir(parents=True, exist_ok=True)
    prepared_dir.mkdir(parents=True, exist_ok=True)

    if not menu_path.exists():
        raise SystemExit(f'Menu file not found: {menu_path}')
    if not images_dir.exists():
        raise SystemExit(f'Images folder not found: {images_dir}')

    df = pd.read_excel(menu_path, dtype=str).fillna('')
    image_files = [p for p in images_dir.rglob('*') if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS]
    if not image_files:
        raise SystemExit('No supported images found. Supported: jpg, jpeg, png, webp, avif, bmp, tif, tiff')

    records = []
    used_outputs: dict[str, Path] = {}
    for _, row in df.iterrows():
        source_key = row.get('source_key', row.get('name', ''))
        product_name = row.get('name', '')
        scored = sorted(((score_match(source_key, product_name, p.name), p) for p in image_files), key=lambda item: item[0], reverse=True)
        score, source = scored[0] if scored else (0, None)
        if not source or score <= 0:
            records.append({'product_name': product_name, 'source_key': source_key, 'match_score': score, 'status': 'NOT_FOUND', 'local_source': '', 'prepared_file': ''})
            continue

        output_name = f'{safe_filename(product_name)}.jpg'
        destination = prepared_dir / output_name
        if source not in used_outputs:
            try:
                convert_to_jpg(source, destination)
                used_outputs[str(source)] = destination
            except Exception as exc:
                records.append({'product_name': product_name, 'source_key': source_key, 'match_score': score, 'status': f'ERROR: {exc}', 'local_source': str(source), 'prepared_file': ''})
                continue
        else:
            # Duplicate product matches share the same source image; create a copy with a unique name.
            if destination.exists() and destination.resolve() != used_outputs[str(source)].resolve():
                shutil.copy2(used_outputs[str(source)], destination)
        records.append({'product_name': product_name, 'source_key': source_key, 'match_score': score, 'status': 'MATCHED', 'local_source': str(source), 'prepared_file': str(destination)})

    manifest = pd.DataFrame(records)
    manifest.to_excel(out_dir / 'image_manifest.xlsx', index=False, sheet_name='Image manifest')
    manifest.to_csv(out_dir / 'image_manifest.csv', index=False, encoding='utf-8-sig')

    zip_path = out_dir / 'images_for_yandex.zip'
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for image in prepared_dir.glob('*.jpg'):
            archive.write(image, arcname=f'images_for_yandex/{image.name}')

    matched = int((manifest['status'] == 'MATCHED').sum())
    missing = int((manifest['status'] == 'NOT_FOUND').sum())
    print(f'Products in menu: {len(manifest)}')
    print(f'Matched products: {matched}')
    print(f'Products without a matched image: {missing}')
    print(f'Prepared image files: {len(list(prepared_dir.glob("*.jpg")))}')
    print(f'Created manifest: {out_dir / "image_manifest.xlsx"}')
    print(f'Created ZIP: {zip_path}')


if __name__ == '__main__':
    main()
