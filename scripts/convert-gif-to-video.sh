#!/bin/bash

# Convert cloudos.gif to MP4/WebM for 90%+ file size reduction
# Prerequisites: brew install ffmpeg (macOS) or apt install ffmpeg (Linux)

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed."
    echo "Install it with:"
    echo "  macOS: brew install ffmpeg"
    echo "  Linux: sudo apt install ffmpeg"
    exit 1
fi

SOURCE="src/assets/img/cloudos/cloudos.gif"
OUTPUT_DIR="src/assets/img/cloudos"

if [ ! -f "$SOURCE" ]; then
    echo "❌ Source file not found: $SOURCE"
    exit 1
fi

echo "🎬 Converting GIF to optimized video formats..."
echo "   Source: $SOURCE ($(du -h "$SOURCE" | cut -f1))"
echo ""

# Convert to MP4 (H.264) - best compatibility
echo "📹 Creating MP4 (H.264)..."
ffmpeg -y -i "$SOURCE" \
    -movflags faststart \
    -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:v libx264 \
    -crf 23 \
    -preset slow \
    "$OUTPUT_DIR/cloudos.mp4" 2>/dev/null

if [ -f "$OUTPUT_DIR/cloudos.mp4" ]; then
    echo "   ✓ cloudos.mp4: $(du -h "$OUTPUT_DIR/cloudos.mp4" | cut -f1)"
fi

# Convert to WebM (VP9) - smaller, modern browsers
echo "📹 Creating WebM (VP9)..."
ffmpeg -y -i "$SOURCE" \
    -c:v libvpx-vp9 \
    -crf 30 \
    -b:v 0 \
    -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    "$OUTPUT_DIR/cloudos.webm" 2>/dev/null

if [ -f "$OUTPUT_DIR/cloudos.webm" ]; then
    echo "   ✓ cloudos.webm: $(du -h "$OUTPUT_DIR/cloudos.webm" | cut -f1)"
fi

# Create a poster image (first frame)
echo "🖼️  Creating poster image..."
ffmpeg -y -i "$SOURCE" \
    -vf "select=eq(n\,0)" \
    -vframes 1 \
    "$OUTPUT_DIR/cloudos-poster.jpg" 2>/dev/null

if [ -f "$OUTPUT_DIR/cloudos-poster.jpg" ]; then
    echo "   ✓ cloudos-poster.jpg: $(du -h "$OUTPUT_DIR/cloudos-poster.jpg" | cut -f1)"
fi

echo ""
echo "✅ Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Update src/shared/screenshots.ts to use the video instead of GIF"
echo "2. Use a <video> element with autoplay loop muted for GIF-like behavior"
echo ""
echo "Example usage in React:"
echo "  <video autoPlay loop muted playsInline poster={cloudosPoster}>"
echo "    <source src={cloudosWebm} type=\"video/webm\" />"
echo "    <source src={cloudosMp4} type=\"video/mp4\" />"
echo "  </video>"
