from rembg import remove
from PIL import Image
import os

images = [
    ("IMG_5164.JPG.jpeg", "public/images/adana_kuzu_sis_kebap.webp"),
    ("IMG_5165.JPG.jpeg", "public/images/kuzu_tavuk_sis_kebap.webp"),
    ("IMG_5172.JPG.jpeg", "public/images/adana_tavuk_sis_kebap.webp"),
]

for src, dest in images:
    if not os.path.exists(src):
        print("Missing file:", src)
        continue
    print(f"Processing {src} -> {dest}...")
    input_img = Image.open(src)
    transparent_img = remove(input_img)
    white_bg = Image.new("RGBA", transparent_img.size, (255, 255, 255, 255))
    final_img = Image.alpha_composite(white_bg, transparent_img).convert("RGB")
    final_img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    final_img.save(dest, "WEBP", quality=82)
    print(f"Saved {dest} successfully!")

print("All kebab photos processed with pure white background!")
