#!/bin/bash

# AI SEO Automation Platform - Production Setup Script
# This script prepares the application for production deployment

set -e

echo "🚀 AI SEO Automation Platform - Production Setup"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Starting production setup...${NC}"

# 1. Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# 2. Run security audit
echo -e "${YELLOW}🔒 Running security audit...${NC}"
npm audit --audit-level moderate

# 3. Run type checking
echo -e "${YELLOW}🔍 Running TypeScript checks...${NC}"
npm run type-check

# 4. Run linting
echo -e "${YELLOW}📝 Running code quality checks...${NC}"
npm run lint

# 5. Run tests (if available)
if npm run | grep -q "test"; then
    echo -e "${YELLOW}🧪 Running tests...${NC}"
    npm run test
else
    echo -e "${YELLOW}⚠️  No tests found. Consider adding tests for production readiness.${NC}"
fi

# 6. Build the application
echo -e "${YELLOW}🏗️  Building application...${NC}"
npm run build

# 7. Check build output
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build successful! Output directory: dist/${NC}"
    echo -e "${BLUE}📊 Build statistics:${NC}"
    du -sh dist/
    find dist/ -name "*.js" -o -name "*.css" | head -5 | while read file; do
        echo "  📄 $(basename "$file"): $(du -h "$file" | cut -f1)"
    done
else
    echo -e "${RED}❌ Build failed! No dist directory found.${NC}"
    exit 1
fi

# 8. Environment validation
echo -e "${YELLOW}🔧 Validating environment configuration...${NC}"
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ Environment template found${NC}"
else
    echo -e "${YELLOW}⚠️  No .env.example found. Creating one...${NC}"
    cp .env.production .env.example
fi

# 9. Generate deployment checklist
echo -e "${YELLOW}📋 Generating deployment checklist...${NC}"
cat > DEPLOYMENT_CHECKLIST.md << 'EOF'
# 🚀 Production Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] All environment variables configured in deployment platform
- [ ] API keys are valid and have sufficient quotas
- [ ] Database is set up and accessible
- [ ] Domain and SSL certificate configured

### Code Quality
- [ ] All tests passing
- [ ] Code linting completed without errors
- [ ] TypeScript compilation successful
- [ ] Security audit passed
- [ ] Performance benchmarks met

### Documentation
- [ ] README.md updated with current information
- [ ] API documentation current
- [ ] User manual reviewed and updated
- [ ] Change log updated

## Deployment

### Build Process
- [ ] Clean build completed successfully
- [ ] Build artifacts uploaded to deployment platform
- [ ] Environment variables set correctly
- [ ] Build logs reviewed for warnings

### Infrastructure
- [ ] CDN configured and working
- [ ] Database connections tested
- [ ] API endpoints responding correctly
- [ ] SSL certificate valid

## Post-Deployment

### Functionality Testing
- [ ] Authentication working (demo users can log in)
- [ ] SEO audit generation functional
- [ ] Content planning features working
- [ ] Export functionality operational
- [ ] Analytics tracking active

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Error rates < 1%

### Monitoring Setup
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring enabled
- [ ] Analytics dashboard accessible

### User Experience
- [ ] All demo users can access the platform
- [ ] User interface responsive on mobile
- [ ] All features accessible and functional
- [ ] Help documentation accessible

## Security Checklist

### Access Control
- [ ] Admin access properly restricted
- [ ] User permissions working correctly
- [ ] API keys secured and not exposed
- [ ] HTTPS enforced everywhere

### Data Protection
- [ ] User data encrypted in transit and at rest
- [ ] Input validation working
- [ ] SQL injection protection active
- [ ] XSS protection implemented

## Business Continuity

### Backup and Recovery
- [ ] Database backups configured
- [ ] Code repository backed up
- [ ] Recovery procedures documented
- [ ] Disaster recovery plan in place

### Support Readiness
- [ ] Support documentation complete
- [ ] Support team trained
- [ ] Escalation procedures defined
- [ ] Customer communication plan ready

## Launch Preparation

### Marketing
- [ ] Landing page updated
- [ ] Social media accounts ready
- [ ] Press kit prepared
- [ ] Launch announcement scheduled

### Customer Onboarding
- [ ] User onboarding flow tested
- [ ] Welcome emails configured
- [ ] Tutorial content ready
- [ ] Support channels operational

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Sign-off**: ___________
EOF

# 10. Create production environment check script
echo -e "${YELLOW}🔍 Creating environment check script...${NC}"
cat > scripts/check-production-env.js << 'EOF'
#!/usr/bin/env node

const requiredEnvVars = [
    'VITE_CLERK_PUBLISHABLE_KEY',
    'GEMINI_API_KEY',
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID'
];

const optionalEnvVars = [
    'VITE_GA_TRACKING_ID',
    'VITE_SENTRY_DSN',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID'
];

console.log('🔍 Production Environment Check');
console.log('================================');

let allRequired = true;

console.log('\n📋 Required Environment Variables:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: Set (${value.substring(0, 10)}...)`);
    } else {
        console.log(`❌ ${varName}: Not set`);
        allRequired = false;
    }
});

console.log('\n📋 Optional Environment Variables:');
optionalEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: Set`);
    } else {
        console.log(`⚠️  ${varName}: Not set (optional)`);
    }
});

console.log('\n🔧 Environment Summary:');
if (allRequired) {
    console.log('✅ All required environment variables are set');
    console.log('🚀 Ready for production deployment!');
    process.exit(0);
} else {
    console.log('❌ Some required environment variables are missing');
    console.log('📚 Check .env.production for required variables');
    process.exit(1);
}
EOF

chmod +x scripts/check-production-env.js

# 11. Performance analysis
echo -e "${YELLOW}⚡ Analyzing build performance...${NC}"
if command -v du &> /dev/null && [ -d "dist" ]; then
    echo -e "${BLUE}📊 Bundle size analysis:${NC}"
    echo "  Total size: $(du -sh dist/ | cut -f1)"
    
    if [ -d "dist/assets" ]; then
        echo "  JavaScript: $(find dist/assets -name "*.js" -exec du -ch {} + | tail -1 | cut -f1)"
        echo "  CSS: $(find dist/assets -name "*.css" -exec du -ch {} + | tail -1 | cut -f1)"
    fi
fi

# 12. Generate deployment summary
echo -e "${YELLOW}📄 Generating deployment summary...${NC}"
cat > DEPLOYMENT_SUMMARY.md << EOF
# 🚀 Deployment Summary

**Generated**: $(date)
**Version**: $(node -p "require('./package.json').version")
**Environment**: Production
**Build Status**: ✅ Success

## 📊 Build Information

- **Node Version**: $(node --version)
- **NPM Version**: $(npm --version)
- **Build Time**: $(date)
- **Build Size**: $(du -sh dist/ 2>/dev/null | cut -f1 || echo "Unknown")

## 🔧 Environment Variables

$(node scripts/check-production-env.js 2>/dev/null || echo "Run 'node scripts/check-production-env.js' to check environment")

## 📋 Pre-Deployment Checklist

- ✅ Dependencies installed and audited
- ✅ TypeScript compilation successful
- ✅ Code linting passed
- ✅ Build completed successfully
- ✅ Environment check script created
- ✅ Deployment checklist generated

## 🚀 Next Steps

1. **Set Environment Variables**: Configure all required environment variables in your deployment platform
2. **Deploy to Staging**: Test the application in a staging environment
3. **Run Tests**: Perform comprehensive testing
4. **Deploy to Production**: Deploy to your production environment
5. **Monitor**: Set up monitoring and alerting

## 📞 Support

- **Documentation**: See docs/ directory
- **User Manual**: docs/USER_MANUAL.md
- **Developer Guide**: docs/DEVELOPER_GUIDE.md
- **Issues**: Create GitHub issues for problems

## 🔗 Important Links

- **Staging URL**: Will be provided after staging deployment
- **Production URL**: Will be provided after production deployment
- **Monitoring Dashboard**: Configure after deployment
- **Documentation**: Available in docs/ folder

---

**Deployment prepared by**: AI SEO Platform Setup Script
**Ready for deployment**: $(date)
EOF

# Final summary
echo ""
echo -e "${GREEN}🎉 Production setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Generated files:${NC}"
echo "  📄 DEPLOYMENT_CHECKLIST.md - Complete deployment checklist"
echo "  📄 DEPLOYMENT_SUMMARY.md - Deployment summary and next steps"
echo "  🔍 scripts/check-production-env.js - Environment validation script"
echo ""
echo -e "${BLUE}🚀 Next steps:${NC}"
echo "  1. Review DEPLOYMENT_CHECKLIST.md"
echo "  2. Configure environment variables in your deployment platform"
echo "  3. Run 'node scripts/check-production-env.js' to validate environment"
echo "  4. Deploy to staging first, then production"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  📖 User Manual: docs/USER_MANUAL.md"
echo "  🔧 Developer Guide: docs/DEVELOPER_GUIDE.md"
echo "  🎯 README: README.md"
echo ""
echo -e "${GREEN}✅ Your AI SEO Automation Platform is ready for deployment!${NC}"
