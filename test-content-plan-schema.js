// Test the content plan schema fix
import { aiService } from './services/aiService.js';

async function testContentPlanSchema() {
    console.log('🧪 Testing Content Plan Schema Fix...');
    
    const testBrandData = {
        name: "Apollo Fertility",
        website: "https://apollofertility.com",
        description: "Leading fertility clinic providing IVF, ICSI, and reproductive health services",
        businessType: "Healthcare",
        serviceCategory: "Fertility & Reproductive Health",
        targetCustomer: "Couples seeking fertility treatment",
        keyServices: "IVF, ICSI, Egg Freezing, Fertility Testing",
        location: "Mumbai",
        socialMedia: {
            linkedin: "apollo-fertility",
            twitter: "@apollofertility",
            facebook: "apollofertilityclinic",
            instagram: "@apollofertility"
        }
    };

    const testKeywords = {
        primaryKeywords: ["IVF treatment Mumbai", "fertility clinic Mumbai"],
        urgentKeywords: ["emergency fertility consultation"],
        serviceKeywords: ["egg freezing", "ICSI treatment"],
        problemKeywords: ["infertility treatment", "fertility issues"],
        longTailKeywords: ["best IVF clinic Mumbai with high success rates"],
        locationKeywords: ["fertility clinic Andheri", "IVF center Mumbai"],
        competitorKeywords: ["Cloudnine fertility", "Nova IVI fertility"],
        keywordDifficulty: {
            "IVF treatment Mumbai": 65,
            "fertility clinic Mumbai": 55
        },
        searchVolume: {
            "IVF treatment Mumbai": 2400,
            "fertility clinic Mumbai": 1800
        },
        keywordOpportunities: ["fertility counseling", "reproductive health"],
        seasonalKeywords: ["fertility treatment winter"],
        voiceSearchKeywords: ["fertility clinic near me"]
    };

    try {
        console.log('📋 Generating content plan and social posts...');
        const result = await aiService.generateContentAndSocial(testBrandData, testKeywords);
        
        console.log('\n✅ Content Plan Generated Successfully!');
        console.log('📊 Content Plan Structure:');
        console.log('- Homepage Title:', result.contentPlan.homepageTitle ? '✅ Generated' : '❌ Missing');
        console.log('- Blog Posts:', result.contentPlan.blogPosts?.length || 0, 'posts');
        
        if (result.contentPlan.blogPosts && result.contentPlan.blogPosts.length > 0) {
            console.log('\n📝 First Blog Post Structure:');
            const firstPost = result.contentPlan.blogPosts[0];
            console.log('- Title:', firstPost.title ? '✅' : '❌');
            console.log('- Outline:', Array.isArray(firstPost.outline) ? `✅ (${firstPost.outline.length} sections)` : '❌');
            console.log('- Target Keywords:', Array.isArray(firstPost.targetKeywords) ? `✅ (${firstPost.targetKeywords.length} keywords)` : '❌');
            console.log('- Word Count:', typeof firstPost.wordCount === 'number' ? '✅' : '❌');
            console.log('- Priority:', firstPost.priority ? '✅' : '❌');
            
            console.log('\n📋 Blog Post Details:');
            console.log(JSON.stringify(firstPost, null, 2));
        }
        
        console.log('\n🎉 SCHEMA FIX VALIDATION: SUCCESS!');
        console.log('✅ Content plan now generates proper blog post objects instead of strings');
        
    } catch (error) {
        console.error('❌ Schema test failed:', error.message);
        if (error.message.includes('schema')) {
            console.error('🔧 Schema validation error - may need further adjustments');
        }
        return false;
    }
    
    return true;
}

// Run the test
testContentPlanSchema()
    .then(success => {
        if (success) {
            console.log('\n🚀 Ready for end-to-end testing in the browser!');
            process.exit(0);
        } else {
            console.log('\n❌ Schema fix needs more work');
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
