#!/bin/bash
# Font subsetting script for Kardeşler brand fonts
# Requires: pip install fonttools brotli

LATIN="U+0000-024F,U+0131,U+015E-015F,U+011E-011F,U+0152-0153,U+02BB-02BC,U+1E00-1EFF,U+2000-206F,U+20AC,U+2122,U+FEFF,U+FFFD"
ARABIC="U+0600-06FF,U+0750-077F,U+200C-200F,U+FB50-FDFF,U+FE70-FEFF"
CYRILLIC="U+0400-04FF,U+0500-052F,U+2DE0-2DFF,U+A640-A69F"

mkdir -p public/fonts/cairo
mkdir -p public/fonts/inter
mkdir -p public/fonts/amiri

echo "Font directories initialized at public/fonts/"
