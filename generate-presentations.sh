#!/bin/bash

# AI SEO Platform - Presentation Generator
# This script generates various presentation formats using Pandoc

echo "🎯 AI SEO Platform - Presentation Generator"
echo "=========================================="

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc is not installed. Please install it first:"
    echo "   macOS: brew install pandoc"
    echo "   Ubuntu: sudo apt-get install pandoc"
    echo "   Windows: Download from https://pandoc.org/installing.html"
    exit 1
fi

# Create presentations directory
mkdir -p presentations

echo "📊 Generating Technical Maintenance Presentation..."

# Generate PDF presentation (requires LaTeX)
if command -v pdflatex &> /dev/null; then
    pandoc TECHNICAL_PRESENTATION.md \
        -t beamer \
        -o presentations/technical-maintenance.pdf \
        --slide-level=2 \
        --theme=metropolis \
        --color-theme=seahorse
    echo "✅ PDF presentation created: presentations/technical-maintenance.pdf"
else
    echo "⚠️  LaTeX not found. Skipping PDF generation."
fi

# Generate HTML presentation (reveal.js)
pandoc TECHNICAL_PRESENTATION.md \
    -t revealjs \
    -s \
    -o presentations/technical-maintenance.html \
    --slide-level=2 \
    --theme=black \
    --transition=slide \
    --variable revealjs-url=https://unpkg.com/reveal.js@4.3.1/
echo "✅ HTML presentation created: presentations/technical-maintenance.html"

# Generate PowerPoint presentation
pandoc TECHNICAL_PRESENTATION.md \
    -t pptx \
    -o presentations/technical-maintenance.pptx \
    --slide-level=2
echo "✅ PowerPoint presentation created: presentations/technical-maintenance.pptx"

# Generate Word document
pandoc TECHNICAL_MAINTENANCE.md \
    -t docx \
    -o presentations/technical-maintenance.docx \
    --toc \
    --highlight-style=github
echo "✅ Word document created: presentations/technical-maintenance.docx"

echo ""
echo "🎉 All presentations generated successfully!"
echo ""
echo "📁 Generated files:"
echo "   • presentations/technical-maintenance.html (Interactive web presentation)"
echo "   • presentations/technical-maintenance.pptx (PowerPoint)"
echo "   • presentations/technical-maintenance.docx (Word document)"
if command -v pdflatex &> /dev/null; then
    echo "   • presentations/technical-maintenance.pdf (PDF slides)"
fi
echo ""
echo "💡 To view the HTML presentation:"
echo "   Open presentations/technical-maintenance.html in your browser"
echo ""
echo "🚀 Ready for your technical review meeting!"