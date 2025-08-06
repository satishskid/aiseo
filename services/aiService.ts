
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { 
    AllData, 
    BrandData, 
    KeywordStrategy, 
    ContentPlan, 
    SocialPosts, 
    TechnicalSeoPlan, 
    ConversionPlan, 
    PerformanceInputs, 
    PerformanceAnalysis, 
    InitialBrandInput, 
    SeoAudit,
    PublishingPlan,
    SalesInsight
} from '../types';

// --- 1. DEFINE THE GENERIC AI SERVICE INTERFACE ---
// This interface defines a standard contract for any AI service.
// This makes it easy to swap out Gemini for another provider in the future.
export interface AIService {
  generateBusinessFoundation(data: InitialBrandInput): Promise<Omit<BrandData, keyof InitialBrandInput>>;
  generateBaselineSeoAudit(data: InitialBrandInput): Promise<SeoAudit>;
  generateKeywordStrategy(data: BrandData): Promise<KeywordStrategy>;
  generateContentAndSocial(data: BrandData, keywords: KeywordStrategy): Promise<{ contentPlan: ContentPlan; socialPosts: SocialPosts }>;
  generatePublishingCalendar(strategy: AllData): Promise<PublishingPlan>;
  generateTechnicalSeo(data: BrandData): Promise<TechnicalSeoPlan>;
  generateConversionPlan(data: BrandData): Promise<ConversionPlan>;
  analyzePerformanceData(strategy: AllData, performanceData: PerformanceInputs): Promise<PerformanceAnalysis>;
  generateSalesInsights(strategy: AllData): Promise<SalesInsight[]>;
}


// --- 2. IMPLEMENT THE GEMINI-SPECIFIC SERVICE ---
// This class implements the AIService interface using the Google Gemini API.
// It is designed to be instantiated on the client-side with a user-provided key.
export class GeminiService implements AIService {
    private ai: GoogleGenAI;
    private model = "gemini-2.5-flash";

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error("An API key is required to initialize the GeminiService.");
        }
        this.ai = new GoogleGenAI({ apiKey });
    }

    private async generateWithSchema<T>(prompt: string, schema: any): Promise<T> {
        const response: GenerateContentResponse = await this.ai.models.generateContent({
            model: this.model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        try {
            const jsonText = response.text.trim();
            // Basic cleanup for markdown code blocks if the API returns it
            const cleanedJson = jsonText.replace(/^```json\s*|```$/g, '').trim();
            return JSON.parse(cleanedJson) as T;
        } catch (e) {
            console.error("Failed to parse Gemini JSON response:", response.text);
            throw new Error("Invalid JSON response from API. Please check the console for details.");
        }
    }

    async generateBusinessFoundation(data: InitialBrandInput): Promise<Omit<BrandData, keyof InitialBrandInput>> {
        const prompt = `
            Act as an expert business consultant and SEO copywriter.
            Based on the following business information, generate an optimized business foundation.
            If a website URL is provided, you can use its content to inform your response.
            - Business Name: ${data.name}
            - Website URL: ${data.website || 'Not provided'}
            - Industry: ${data.businessType}
            - Service Model: ${data.serviceType}
            - Target Locations: Scope is ${data.locationScope}. Specifically targeting: ${data.selectedCities.join(', ')} and custom locations: ${data.specificLocations}.

            Generate the following three components, written to be clear, compelling, and optimized for SEO:
            1.  **description**: A detailed "About Your Business" description. Explain the company's mission, value proposition, and what makes it unique in the Indian market.
            2.  **targetCustomer**: A specific "Target Customer Persona". Describe the ideal customer, their needs, pain points, and why they would choose this business.
            3.  **keyServices**: A bulleted or comma-separated list of the "Key Services/Features". Clearly list the main offerings.
        `;
        
        const schema = {
            type: Type.OBJECT,
            properties: {
                description: { type: Type.STRING, description: "A detailed and compelling 'About Us' description for the business." },
                targetCustomer: { type: Type.STRING, description: "A specific and detailed description of the ideal customer persona." },
                keyServices: { type: Type.STRING, description: "A clear, concise list of the key services or features offered." },
            },
            required: ["description", "targetCustomer", "keyServices"],
        };
        
        return this.generateWithSchema<Omit<BrandData, keyof InitialBrandInput>>(prompt, schema);
    }

    async generateBaselineSeoAudit(data: InitialBrandInput): Promise<SeoAudit> {
        const prompt = `
            Act as an expert SEO auditor.
            Based on the following business information, perform a high-level baseline SEO audit.
            If a website URL is provided, infer what you can about its structure and content.
            - Business Name: ${data.name}
            - Website URL: ${data.website || 'Not provided'}
            - Industry: ${data.businessType}
            - Social Media Handles: LinkedIn: ${data.linkedinHandle || 'N/A'}, Twitter: ${data.twitterHandle || 'N/A'}, Facebook: ${data.facebookHandle || 'N/A'}

            Generate a structured audit report with the following components:
            1.  **overallScore**: An estimated overall SEO score from 0 to 100, representing the brand's current online presence and SEO maturity.
            2.  **summary**: A brief, 2-3 sentence summary of the brand's current SEO standing.
            3.  **contentObservations**: 2-3 bullet points on potential content strengths or weaknesses (e.g., "Likely lacks a dedicated blog," "Homepage probably targets branded terms well").
            4.  **technicalObservations**: 2-3 bullet points on likely technical SEO aspects (e.g., "Mobile-friendliness is crucial," "Site speed may be a factor in India"). This is an inferred analysis.
            5.  **socialObservations**: 2-3 bullet points on the brand's social media presence based on the handles provided.
            6.  **quickWins**: 3-4 actionable, high-impact "quick win" recommendations the business can implement immediately.
        `;

        const schema = {
            type: Type.OBJECT,
            properties: {
                overallScore: { type: Type.INTEGER, description: "An estimated SEO score from 0-100." },
                summary: { type: Type.STRING, description: "A brief summary of the SEO standing." },
                contentObservations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Observations about the website's content." },
                technicalObservations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Inferred observations about technical SEO." },
                socialObservations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Observations about social media presence." },
                quickWins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable, high-impact recommendations." },
            },
            required: ["overallScore", "summary", "contentObservations", "technicalObservations", "socialObservations", "quickWins"],
        };

        return this.generateWithSchema<SeoAudit>(prompt, schema);
    }
    
    async generateKeywordStrategy(data: BrandData): Promise<KeywordStrategy> {
      const prompt = `
        Analyze the following business to create an SEO keyword strategy for the Indian market.
        - Business Name: ${data.name}
        - Industry: ${data.businessType}
        - Target Locations: Scope is ${data.locationScope}. Specifically targeting: ${data.selectedCities.join(', ')} and custom locations: ${data.specificLocations}.
        - Description: ${data.description}
        - Target Customer: ${data.targetCustomer}

        Generate a comprehensive keyword strategy. Also, provide an initial analysis of the competitive landscape.
        
        Output should include:
        - High-intent local keywords for the specified Indian cities/locations.
        - Urgent/immediate need keywords.
        - Service-based commercial keywords.
        - Problem-solving informational keywords.
        - Long-tail opportunities with low competition.
        - A summary of strategic insights for the Indian market.
        - High-level content pillars.
        - A total count of unique keywords generated.
        - A 'competitiveScore' (0-100) estimating ranking difficulty.
        - An initial 'seoScore' (0-100) estimating the business's SEO readiness based on the info provided (this should be an improvement on the baseline audit).
      `;

      const schema = {
        type: Type.OBJECT,
        properties: {
          primaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High intent keywords for core services." },
          urgentKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords for users needing immediate help." },
          serviceKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords describing specific services offered." },
          problemKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords for users researching a problem." },
          longTailKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Longer, more specific keywords." },
          locationKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords targeting specific Indian cities." },
          contentPillars: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-level content themes." },
          strategicInsights: { type: Type.STRING, description: "Actionable strategic advice for the Indian market." },
          totalKeywords: { type: Type.INTEGER, description: "Total number of unique keywords generated." },
          competitiveScore: { type: Type.INTEGER, description: "An estimated competitive score from 0 to 100." },
          seoScore: { type: Type.INTEGER, description: "An estimated initial SEO readiness score from 0 to 100." },
        },
        required: ["primaryKeywords", "urgentKeywords", "serviceKeywords", "problemKeywords", "longTailKeywords", "locationKeywords", "contentPillars", "strategicInsights", "totalKeywords", "competitiveScore", "seoScore"],
      };

      return this.generateWithSchema<KeywordStrategy>(prompt, schema);
    }

    async generateContentAndSocial(data: BrandData, keywords: KeywordStrategy): Promise<{ contentPlan: ContentPlan; socialPosts: SocialPosts }> {
        const prompt = `
            Based on the business info and keyword strategy, create a content plan and social media posts.

            Business: ${JSON.stringify(data, null, 2)}
            Keywords: ${JSON.stringify(keywords, null, 2)}

            Generate:
            1. A Content Plan:
               - Homepage title and meta description.
               - Ideas for service, urgent, and location-based pages (3-5 examples each). For each page, provide a title, example URL slug, word count, and key features.
               - 5 SEO-optimized blog post titles.
               - Calculate a total number of content pages.
            2. Social Media Posts:
               - 4 distinct posts for each platform: LinkedIn, Twitter, Facebook, Instagram.
               - Tailor the tone and format for each platform.
               - Integrate brand name, services, and target locations naturally.
               - Use relevant hashtags for the Indian market.
        `;
        const pageSchema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING },
                wordCount: { type: Type.STRING },
                features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "url", "wordCount", "features"]
        };
        const schema = {
            type: Type.OBJECT,
            properties: {
                contentPlan: {
                    type: Type.OBJECT,
                    properties: {
                        homepageTitle: { type: Type.STRING },
                        homepageMetaDescription: { type: Type.STRING },
                        servicePages: { type: Type.ARRAY, items: pageSchema },
                        urgentPages: { type: Type.ARRAY, items: pageSchema },
                        locationPages: { type: Type.ARRAY, items: pageSchema },
                        blogPosts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        totalPages: { type: Type.INTEGER }
                    },
                    required: ["homepageTitle", "homepageMetaDescription", "servicePages", "urgentPages", "locationPages", "blogPosts", "totalPages"]
                },
                socialPosts: {
                    type: Type.OBJECT,
                    properties: {
                        linkedin: { type: Type.ARRAY, items: { type: Type.STRING } },
                        twitter: { type: Type.ARRAY, items: { type: Type.STRING } },
                        facebook: { type: Type.ARRAY, items: { type: Type.STRING } },
                        instagram: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["linkedin", "twitter", "facebook", "instagram"]
                }
            },
            required: ["contentPlan", "socialPosts"]
        };
        return this.generateWithSchema<{ contentPlan: ContentPlan; socialPosts: SocialPosts }>(prompt, schema);
    }

    async generatePublishingCalendar(strategy: AllData): Promise<PublishingPlan> {
        const prompt = `
          You are a senior digital marketing manager. Based on the provided SEO strategy, create an actionable 4-week publishing calendar.

          **Strategy Summary:**
          - Business: ${strategy.brandData?.name} (${strategy.brandData?.businessType})
          - Key Content: ${strategy.contentPlan?.blogPosts.join(', ')}
          - Social Platforms: LinkedIn, Twitter, Facebook, Instagram

          **Task:**
          1.  **Provide Expert Advice:**
              -   **publishingCadence:** Recommend a realistic frequency for blog and social media posts.
              -   **strategyDuration:** Advise on how long this plan should be followed before a major review (e.g., 90 days).
              -   **metricsToTrack:** List 3-4 key metrics the user should monitor in Google Analytics/Search Console.
          2.  **Create a 4-Week Calendar:**
              -   Generate a list of calendar events for the next 28 days (day 1 to 28).
              -   Schedule the blog posts from the content plan evenly across the 4 weeks.
              -   Distribute the generated social media posts across the calendar. Use a variety of platforms each week.
              -   For each event, specify the 'day' (1-28), 'type' ('Blog Post' or 'Social Post'), 'platform' (for social posts), a short 'title' or description, and the full 'details' (e.g., the full social post text or a blog post title/outline).
        `;

        const schema = {
            type: Type.OBJECT,
            properties: {
                expertAdvice: {
                    type: Type.OBJECT,
                    properties: {
                        publishingCadence: { type: Type.STRING },
                        strategyDuration: { type: Type.STRING },
                        metricsToTrack: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["publishingCadence", "strategyDuration", "metricsToTrack"]
                },
                calendar: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.INTEGER },
                            type: { type: Type.STRING, enum: ["Blog Post", "Social Post"] },
                            platform: { type: Type.STRING, enum: ["linkedin", "twitter", "facebook", "instagram"] },
                            title: { type: Type.STRING },
                            details: { type: Type.STRING }
                        },
                        required: ["day", "type", "title", "details"]
                    }
                }
            },
            required: ["expertAdvice", "calendar"]
        };
        return this.generateWithSchema<PublishingPlan>(prompt, schema);
    }

    async generateTechnicalSeo(data: BrandData): Promise<TechnicalSeoPlan> {
        const prompt = `
            Create a technical SEO plan for a ${data.businessType} business named ${data.name} targeting the Indian market.
            Focus on:
            - Core Web Vitals optimizations for Indian mobile networks (3G/4G).
            - Essential Schema markup types (e.g., LocalBusiness, Service, etc.) relevant to the industry and India.
            - A general technical SEO checklist.
            - Specific technical optimizations for India (e.g., payment gateways, multilingual setup, address formats).
        `;
        const schema = {
            type: Type.OBJECT,
            properties: {
                coreWebVitals: {
                    type: Type.OBJECT,
                    properties: {
                        lcp: { type: Type.STRING },
                        fid: { type: Type.STRING },
                        cls: { type: Type.STRING }
                    },
                     required: ["lcp", "fid", "cls"]
                },
                schema: { type: Type.ARRAY, items: { type: Type.STRING } },
                technicalChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
                indiaSpecificOptimizations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["coreWebVitals", "schema", "technicalChecklist", "indiaSpecificOptimizations"]
        };
        return this.generateWithSchema<TechnicalSeoPlan>(prompt, schema);
    }

    async generateConversionPlan(data: BrandData): Promise<ConversionPlan> {
        const prompt = `
            Create a conversion rate optimization (CRO) plan for a ${data.businessType} business named ${data.name} targeting Indian users.
            Focus on:
            - High-converting Call-to-Action (CTA) examples, including English/Hindi pairs.
            - List of payment methods popular in India.
            - Trust signals that resonate with an Indian audience.
            - Examples of regional adaptations for key cities like ${data.selectedCities.join(', ')}.
        `;
        const schema = {
            type: Type.OBJECT,
            properties: {
                ctas: { type: Type.ARRAY, items: { type: Type.STRING } },
                indianPaymentMethods: { type: Type.ARRAY, items: { type: Type.STRING } },
                trustSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
                regionalAdaptations: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            city: { type: Type.STRING },
                            adaptations: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["city", "adaptations"]
                    }
                }
            },
            required: ["ctas", "indianPaymentMethods", "trustSignals", "regionalAdaptations"]
        };
        return this.generateWithSchema<ConversionPlan>(prompt, schema);
    }

    async analyzePerformanceData(strategy: AllData, performanceData: PerformanceInputs): Promise<PerformanceAnalysis> {
        const prompt = `
          You are a senior SEO and Marketing Analyst.
          You have been given an initial SEO strategy and recent performance data from various channels.
          Your task is to analyze the performance data in the context of the strategy and provide actionable insights.

          **Initial SEO Strategy:**
          - Keywords Targeted: ${strategy.keywordStrategy?.primaryKeywords.slice(0, 10).join(', ')}...
          - Content Plan: ${strategy.contentPlan?.blogPosts.slice(0, 3).join(', ')}...
          - Target Customer: ${strategy.brandData?.targetCustomer}

          **User-Provided Performance Data (last 30-90 days):**
          - Google Search Console Top Queries: ${performanceData.gscQueries}
          - Google Analytics Traffic Acquisition: ${performanceData.gaTraffic}
          - Meta (Facebook/Instagram) Insights: ${performanceData.metaInsights}
          - LinkedIn Page Analytics: ${performanceData.linkedinInsights}
          - X (Twitter) Analytics: ${performanceData.twitterInsights}

          **Analysis Required:**
          Based on all the information above, provide a structured analysis.
          1.  **Key Wins:** Identify 2-3 areas where performance is strong or aligns well with the initial strategy. (e.g., "Ranking for 'online doctor consultation in Mumbai' is a great start.")
          2.  **Opportunities:** Identify 2-3 untapped opportunities or gaps. (e.g., "High traffic from 'child health tips' but no dedicated blog post exists.")
          3.  **Actionable Recommendations:** Provide 3-4 concrete, actionable next steps. (e.g., "Create a detailed blog post targeting 'child health tips' and link to the pediatric consultation page.")
          4.  **Content Prioritization:** List the top 3 specific content pieces (from the generated content plan or new ideas) that should be created or promoted next, based on the performance data.
        `;

        const schema = {
            type: Type.OBJECT,
            properties: {
                keyWins: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Positive observations where performance aligns with strategy." },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Gaps or untapped areas for growth." },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific, actionable steps to take next." },
                contentPrioritization: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3 content pieces to focus on next." },
            },
            required: ["keyWins", "opportunities", "recommendations", "contentPrioritization"]
        };

        return this.generateWithSchema<PerformanceAnalysis>(prompt, schema);
    }
    
    async generateSalesInsights(strategy: AllData): Promise<SalesInsight[]> {
        const prompt = `
            You are a sales coach preparing a salesperson for a client demo of an SEO tool.
            You have the complete SEO strategy that was just generated for the client.
            Your task is to create a list of key talking points ("Sales Insights") that the salesperson can use to highlight the value and intelligence of the tool during the demo.

            **Generated Strategy for Client "${strategy.brandData?.name}":**
            - SEO Audit Score: ${strategy.seoAudit?.overallScore}/100
            - Key Keywords: ${strategy.keywordStrategy?.primaryKeywords.slice(0, 5).join(', ')}
            - Content Plan: ${strategy.contentPlan?.blogPosts.length} blog posts suggested.
            - Publishing Cadence: Suggests publishing ${strategy.publishingPlan?.calendar.filter(e => e.type === 'Blog Post').length} blog posts in the first month.
            - Target Locations: ${strategy.brandData?.selectedCities.join(', ')} ${strategy.brandData?.specificLocations}

            **Task:**
            Generate a list of 5-7 concise, impactful talking points. For each point, specify which "step" of the demo it relates to and the "point" to make.
            Focus on demonstrating how the tool is smart, personalized, and action-oriented.

            Example talking points:
            - "Notice in the SEO audit, we immediately identified 'Quick Wins' you can act on today."
            - "The keyword strategy isn't generic; it's hyper-focused on your specific locations like Mumbai and Pune."
            - "We don't just give you ideas; the Publishing Calendar provides a concrete 4-week action plan."
        `;

        const schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.STRING, description: "The demo step this insight relates to (e.g., 'Step 1: Audit', 'Step 4: Calendar')." },
                    point: { type: Type.STRING, description: "The concise talking point for the salesperson." }
                },
                required: ["step", "point"]
            }
        };

        return this.generateWithSchema<SalesInsight[]>(prompt, schema);
    }
}
