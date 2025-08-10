#!/bin/bash

# Deployment Status Checker
# Run this script to check deployment progress

echo "🚀 AI SEO Automation Platform - Deployment Status"
echo "=================================================="
echo ""

# Check Git status
echo "📝 Git Status:"
echo "Latest commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
echo "Branch: $(git branch --show-current)"
echo "Remote: $(git remote get-url origin)"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Environment file (.env.local) exists"
else
    echo "⚠️  Environment file (.env.local) not found"
    echo "   Create .env.local with your API keys for local development"
fi
echo ""

# Check key files
echo "📋 Key Files Status:"
files=("package.json" "netlify.toml" "vite.config.ts" "README.md" "docs/USER_MANUAL.md" "docs/DEVELOPER_GUIDE.md")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing"
    fi
done
echo ""

# Netlify deployment info
echo "🌐 Netlify Deployment:"
echo "Repository: https://github.com/satishskid/aiseo.git"
echo "If connected to Netlify, check your dashboard at: https://app.netlify.com/"
echo ""

# Next steps
echo "📌 Next Steps:"
echo "1. Verify Netlify deployment at your dashboard"
echo "2. Set environment variables in Netlify:"
echo "   - VITE_CLERK_PUBLISHABLE_KEY"
echo "   - GEMINI_API_KEY"
echo "3. Test the deployed application"
echo "4. Set up custom domain (optional)"
echo ""

echo "🎉 Deployment push completed successfully!"
echo "Check Netlify dashboard for build progress."
