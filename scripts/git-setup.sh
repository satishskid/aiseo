#!/bin/bash

# Git Repository Setup and Deployment Script
# This script initializes the Git repository and prepares for deployment

set -e

echo "📦 Git Repository Setup and Deployment"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}🔧 Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
else
    echo -e "${BLUE}📁 Git repository already exists${NC}"
fi

# Check git status
echo -e "${BLUE}📊 Current Git status:${NC}"
git status --porcelain

# Add all files
echo -e "${YELLOW}📂 Adding files to Git...${NC}"
git add .

# Create comprehensive .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}📝 Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary folders
tmp/
temp/

# Cache
.cache/
.parcel-cache/

# Firebase
.firebase/
firebase-debug.log

# Netlify
.netlify/

# Local development
presentations/*.pptx
*.local

# Backup files
*.backup
*.bak
EOF
fi

# Commit initial version
echo -e "${YELLOW}💾 Creating initial commit...${NC}"
if git diff-index --quiet HEAD 2>/dev/null; then
    echo -e "${BLUE}📝 No changes to commit${NC}"
else
    git commit -m "🚀 Initial commit: AI SEO Automation Platform

Features:
- ✨ Complete AI-powered SEO strategy generation
- 🏥 Industry-specific templates (Healthcare, EdTech, AI)
- 📊 Comprehensive analytics dashboard
- 📝 Content planning and social media strategy
- 📅 Publishing calendar with scheduling
- ⚡ Technical SEO recommendations
- 💰 Conversion optimization and ROI projections
- 👥 13 demo users for testing
- 🔐 Clerk authentication integration
- 🤖 Google Gemini AI integration
- 🔥 Firebase backend
- 📱 Responsive design with Tailwind CSS
- 🎯 Export functionality (Markdown, CSV, PDF)
- 🔗 Make.com workflow integration

Tech Stack:
- React 19.1.1 + TypeScript 5.8.2
- Tailwind CSS 3.4.17
- Vite 6.2.0
- Google Gemini AI
- Clerk Authentication
- Firebase
- Netlify deployment ready

Ready for production deployment! 🎉"
    echo -e "${GREEN}✅ Initial commit created${NC}"
fi

# Create development branch
echo -e "${YELLOW}🌿 Creating development branch...${NC}"
git checkout -b development 2>/dev/null || git checkout development
echo -e "${GREEN}✅ Development branch ready${NC}"

# Switch back to main
git checkout main

# Create production branch
echo -e "${YELLOW}🚀 Creating production branch...${NC}"
git checkout -b production 2>/dev/null || git checkout production
echo -e "${GREEN}✅ Production branch ready${NC}"

# Switch back to main
git checkout main

# Create release tags
echo -e "${YELLOW}🏷️  Creating release tag...${NC}"
git tag -a v1.0.0 -m "🎉 Release v1.0.0: AI SEO Automation Platform

Major Features:
- Complete SEO strategy automation
- AI-powered content generation
- Industry-specific optimization
- Comprehensive analytics
- Export and integration capabilities
- Production-ready deployment

This release includes:
- 13 demo users for testing
- Full authentication system
- Responsive UI/UX
- Complete documentation
- Deployment scripts
- CI/CD pipeline ready"

echo -e "${GREEN}✅ Release tag v1.0.0 created${NC}"

# Show current status
echo -e "${BLUE}📊 Repository status:${NC}"
echo "  Branches:"
git branch -a
echo ""
echo "  Tags:"
git tag
echo ""
echo "  Last commit:"
git log --oneline -1

# Instructions for GitHub setup
echo ""
echo -e "${BLUE}🔗 Next steps for GitHub deployment:${NC}"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Add GitHub remote:"
echo -e "${YELLOW}   git remote add origin https://github.com/yourusername/ai-seo-platform.git${NC}"
echo ""
echo "3. Push all branches and tags:"
echo -e "${YELLOW}   git push -u origin main${NC}"
echo -e "${YELLOW}   git push origin development${NC}"
echo -e "${YELLOW}   git push origin production${NC}"
echo -e "${YELLOW}   git push origin --tags${NC}"
echo ""
echo "4. Set up GitHub Secrets for CI/CD:"
echo "   - VITE_CLERK_PUBLISHABLE_KEY"
echo "   - GEMINI_API_KEY"
echo "   - FIREBASE_API_KEY"
echo "   - FIREBASE_AUTH_DOMAIN"
echo "   - FIREBASE_PROJECT_ID"
echo "   - FIREBASE_STORAGE_BUCKET"
echo "   - FIREBASE_MESSAGING_SENDER_ID"
echo "   - FIREBASE_APP_ID"
echo "   - NETLIFY_AUTH_TOKEN"
echo "   - NETLIFY_SITE_ID"
echo "   - VITE_APP_URL"
echo ""
echo "5. Set up Netlify deployment:"
echo "   - Connect your GitHub repository"
echo "   - Set build command: npm run build"
echo "   - Set publish directory: dist"
echo "   - Configure environment variables"
echo ""
echo "6. Test deployment:"
echo -e "${YELLOW}   npm run setup:production${NC}"
echo -e "${YELLOW}   npm run check-prod-env${NC}"
echo ""
echo -e "${GREEN}🎉 Git repository is ready for deployment!${NC}"
