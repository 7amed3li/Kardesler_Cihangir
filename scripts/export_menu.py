#!/usr/bin/env python3
"""
Export menu products from Supabase into normalized XLSX and CSV files.

Security:
- Read SUPABASE_URL and SUPABASE_ANON_KEY from environment variables.
- Never paste or commit service_role keys into this file.
- Use a read-only RLS policy for the products table whenever possible.

Expected common columns (the script auto-detects aliases):
name/title/product_name, category/category_name, price/amount,
description/details, image_url/image/image_urls, product_url/url,
in_stock/available, is_popular/popular, language/lang/locale.

If your schema uses different names, pass explicit mappings with the CLI flags.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
from pathlib import Path
from typing import Any, Iterable

import requests
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

ALIASES = {
    "name": ["name", "title", "product_name", "item_name", "dish_name"],
    "category": ["category", "category_name", "section", "menu_category", "type"],
    "price": ["price", "amount", "cost", "selling_price"],
    "description": ["description", "details", "item_description", "short_description"],
    "image_url": ["image_url", "image", "photo_url", "photo", "thumbnail_url", "image_urls"],
    "product_url": ["product_url", "url", "link", "item_url"],
    "in_stock": ["in_stock", "available", "is_available", "active", "enabled"],
    "is_popular": ["is_popular", "popular", "featured", "best_seller"],
    "language": ["language", "lang", "locale"],
}

OUTPUT_COLUMNS = [
    "name",
    "category",
    "price",
    "currency",
    "description",
    "image_url",
    "product_url",
    "in_stock",
    "is_popular",
    "language",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export a Supabase menu table to XLSX and CSV")
    parser.add_argument("--table", default=os.getenv("SUPABASE_TABLE", "products"), help="Supabase table or view")
    parser.add_argument("--language", default=os.getenv("MENU_LANGUAGE", "tr"), help="Language code, default: tr")
    parser.add_argument("--currency", default=os.getenv("MENU_CURRENCY", "TRY"), help="Currency code, default: TRY")
    parser.add_argument("--limit", type=int, default=1000, help="Maximum rows to fetch")
    parser.add_argument("--out", default="yandex_menu_export", help="Output filename prefix")
    parser.add_argument("--name-column", help="Explicit source column for product name")
    parser.add_argument("--category-column", help="Explicit source column for category")
    parser.add_argument("--price-column", help="Explicit source column for price")
    parser.add_argument("--description-column", help="Explicit source column for description")
    parser.add_argument("--image-column", help="Explicit source column for image URL")
    parser.add_argument("--url-column", help="Explicit source column for product URL")
    parser.add_argument("--language-column", help="Explicit source column for language")
    return parser.parse_args()


def get_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise SystemExit(f"Missing environment variable: {name}")
    return value.rstrip("/")


def fetch_rows(base_url: str, anon_key: str, table: str, limit: int) -> list[dict[str, Any]]:
    endpoint = f"{base_url}/rest/v1/{table}"
    headers = {
        "apikey": anon_key,
        "Authorization": f"Bearer {anon_key}",
        "Accept": "application/json",
    }
    response = requests.get(
        endpoint,
        headers=headers,
        params={"select": "*", "limit": str(limit)},
        timeout=30,
    )
    if response.status_code >= 400:
        raise SystemExit(f"Supabase request failed ({response.status_code}): {response.text[:500]}")
    payload = response.json()
    if not isinstance(payload, list):
        raise SystemExit("Supabase returned an unexpected response; expected a JSON array of rows.")
    return [row for row in payload if isinstance(row, dict)]


def choose_column(rows: list[dict[str, Any]], logical_name: str, explicit: str | None) -> str | None:
    if explicit:
        if rows and explicit not in rows[0]:
            available = ", ".join(rows[0].keys())
            raise SystemExit(f"Column '{explicit}' was not found. Available columns: {available}")
        return explicit
    if not rows:
        return None
    keys = set(rows[0].keys())
    for candidate in ALIASES[logical_name]:
        if candidate in keys:
            return candidate
    return None


def as_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False)
    return str(value).strip()


def normalize_bool(value: Any, default: str = "") -> str:
    if value is None or value == "":
        return default
    if isinstance(value, bool):
        return "1" if value else "0"
    text = str(value).strip().lower()
    if text in {"true", "1", "yes", "y", "available", "active", "in stock"}:
        return "1"
    if text in {"false", "0", "no", "n", "unavailable", "inactive", "out of stock"}:
        return "0"
    return text


def normalize_price(value: Any) -> str:
    if value is None or value == "":
        return ""
    if isinstance(value, (int, float)):
        return f"{value:g}"
    text = str(value).strip().replace(",", ".")
    return text


def build_export(rows: list[dict[str, Any]], args: argparse.Namespace) -> tuple[list[dict[str, str]], dict[str, str | None]]:
    mapping = {
        "name": choose_column(rows, "name", args.name_column),
        "category": choose_column(rows, "category", args.category_column),
        "price": choose_column(rows, "price", args.price_column),
        "description": choose_column(rows, "description", args.description_column),
        "image_url": choose_column(rows, "image_url", args.image_column),
        "product_url": choose_column(rows, "product_url", args.url_column),
        "language": choose_column(rows, "language", args.language_column),
        "in_stock": choose_column(rows, "in_stock", None),
        "is_popular": choose_column(rows, "is_popular", None),
    }
    if rows and not mapping["name"]:
        available = ", ".join(rows[0].keys())
        raise SystemExit(f"Could not detect a product-name column. Available columns: {available}. Use --name-column.")

    output: list[dict[str, str]] = []
    for row in rows:
        source_language = as_text(row.get(mapping["language"])) if mapping["language"] else ""
        if source_language and args.language and source_language.lower() not in {args.language.lower(), "tr" if args.language == "turkish" else args.language.lower()}:
            continue
        item = {
            "name": as_text(row.get(mapping["name"])) if mapping["name"] else "",
            "category": as_text(row.get(mapping["category"])) if mapping["category"] else "",
            "price": normalize_price(row.get(mapping["price"])) if mapping["price"] else "",
            "currency": args.currency,
            "description": as_text(row.get(mapping["description"])) if mapping["description"] else "",
            "image_url": as_text(row.get(mapping["image_url"])) if mapping["image_url"] else "",
            "product_url": as_text(row.get(mapping["product_url"])) if mapping["product_url"] else "",
            "in_stock": normalize_bool(row.get(mapping["in_stock"]), "1") if mapping["in_stock"] else "1",
            "is_popular": normalize_bool(row.get(mapping["is_popular"]), "0") if mapping["is_popular"] else "0",
            "language": source_language or args.language,
        }
        if item["name"]:
            output.append(item)
    return output, mapping


def write_csv(items: list[dict[str, str]], path: Path) -> None:
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=OUTPUT_COLUMNS)
        writer.writeheader()
        writer.writerows(items)


def write_xlsx(items: list[dict[str, str]], path: Path) -> None:
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Yandex menu"
    sheet.append(OUTPUT_COLUMNS)
    for cell in sheet[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="1F4E78")
        cell.alignment = Alignment(horizontal="center")
    for item in items:
        sheet.append([item[column] for column in OUTPUT_COLUMNS])
    widths = {"A": 30, "B": 22, "C": 12, "D": 12, "E": 60, "F": 55, "G": 45, "H": 12, "I": 12, "J": 12}
    for column, width in widths.items():
        sheet.column_dimensions[column].width = width
    for row in sheet.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)
    sheet.freeze_panes = "A2"
    workbook.save(path)


def main() -> None:
    args = parse_args()
    base_url = get_env("SUPABASE_URL")
    anon_key = get_env("SUPABASE_ANON_KEY")
    rows = fetch_rows(base_url, anon_key, args.table, args.limit)
    items, mapping = build_export(rows, args)
    prefix = Path(args.out)
    csv_path = prefix.with_suffix(".csv")
    xlsx_path = prefix.with_suffix(".xlsx")
    write_csv(items, csv_path)
    write_xlsx(items, xlsx_path)
    print(f"Fetched rows: {len(rows)}")
    print(f"Exported products: {len(items)}")
    print(f"Detected mapping: {json.dumps(mapping, ensure_ascii=False)}")
    print(f"Created: {csv_path}")
    print(f"Created: {xlsx_path}")
    if not items:
        print("Warning: no products were exported. Check the language filter or column mappings.", file=sys.stderr)


if __name__ == "__main__":
    main()
