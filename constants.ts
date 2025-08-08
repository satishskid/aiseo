
import type { SocialPlatform, ApiProviderId } from './types';
import { LinkedInIcon, TwitterIcon, FacebookIcon, InstagramIcon } from './components/icons';
import React from 'react';

export const INDUSTRY_OPTIONS = [
  { value: "telemedicine", label: "Telemedicine & Digital Health" },
  { value: "pediatric-healthcare", label: "Pediatric Healthcare" },
  { value: "women-health", label: "Women's Health & Fertility" },
  { value: "mental-health", label: "Mental Health Services" },
  { value: "diagnostic-services", label: "Diagnostic Services" },
  { value: "pharmacy-delivery", label: "Pharmacy & Medicine Delivery" },
  { value: "edtech-k12", label: "EdTech - K12 Education" },
  { value: "edtech-higher-ed", label: "EdTech - Higher Education" },
  { value: "skill-development", label: "Skill Development & Training" },
  { value: "language-learning", label: "Language Learning" },
  { value: "test-preparation", label: "Test Preparation & Coaching" },
  { value: "ai-healthcare", label: "AI for Healthcare" },
  { value: "ai-education", label: "AI for Education" },
  { value: "ai-business", label: "AI Business Solutions" },
  { value: "ai-analytics", label: "AI Analytics & Insights" },
  { value: "machine-learning", label: "Machine Learning Services" },
  { value: "other", label: "Other" },
];

export const SERVICE_MODEL_OPTIONS = [
  { value: "b2c", label: "B2C - Direct to Consumer" },
  { value: "b2b", label: "B2B - Business to Business" },
  { value: "b2b2c", label: "B2B2C - Business to Business to Consumer" },
  { value: "saas", label: "SaaS - Software as a Service" },
  { value: "marketplace", label: "Marketplace/Platform" },
];

export const LOCATION_SCOPE_OPTIONS = [
    { value: "pan-india", label: "Pan India" },
    { value: "metro-cities", label: "Metro Cities Only" },
    { value: "tier-2-cities", label: "Tier 2 Cities" },
    { value: "specific-states", label: "Specific States" },
    { value: "specific-cities", label: "Specific Cities" },
];

export const CITY_OPTIONS = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
];

interface SocialPlatformConfig {
  id: SocialPlatform;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  copyAction: string;
}

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
    { id: 'linkedin', name: 'LinkedIn Posts', icon: LinkedInIcon, color: 'border-blue-700', copyAction: 'Copy to LinkedIn' },
    { id: 'twitter', name: 'Twitter Threads', icon: TwitterIcon, color: 'border-sky-500', copyAction: 'Copy to Twitter' },
    { id: 'facebook', name: 'Facebook Posts', icon: FacebookIcon, color: 'border-blue-800', copyAction: 'Copy to Facebook' },
    { id: 'instagram', name: 'Instagram Captions', icon: InstagramIcon, color: 'border-pink-600', copyAction: 'Copy to Instagram' },
];

interface ApiProviderConfig {
    id: ApiProviderId;
    name: string;
    rank: number;
    freeTierInfo: string;
    getApiKeyUrl: string;
    isEnabled: boolean;
}

export const API_PROVIDERS: ApiProviderConfig[] = [
    {
        id: 'gemini',
        name: 'Google Gemini',
        rank: 1,
        freeTierInfo: 'Generous free tier with 60 requests/minute. Best for production use.',
        getApiKeyUrl: 'https://aistudio.google.com/app/apikey',
        isEnabled: true,
    },
    {
        id: 'groq',
        name: 'Groq (Llama 3)',
        rank: 2,
        freeTierInfo: 'Free tier with ultra-fast inference speed. Great alternative.',
        getApiKeyUrl: 'https://console.groq.com/keys',
        isEnabled: true, // Now enabled
    },
    {
        id: 'openrouter',
        name: 'OpenRouter (Qwen/Kimi)',
        rank: 3,
        freeTierInfo: 'Access to multiple free models including Qwen and Kimi.',
        getApiKeyUrl: 'https://openrouter.ai/keys',
        isEnabled: true, // Now enabled
    },
    {
        id: 'claude',
        name: 'Anthropic Claude',
        rank: 4,
        freeTierInfo: 'Free tier credits available. Excellent for creative content.',
        getApiKeyUrl: 'https://console.anthropic.com/',
        isEnabled: true, // Now enabled
    },
    {
        id: 'openai',
        name: 'OpenAI GPT',
        rank: 5,
        freeTierInfo: 'Paid service with free credits for new users.',
        getApiKeyUrl: 'https://platform.openai.com/api-keys',
        isEnabled: true, // Now enabled
    }
];


export const baseButtonClasses = "py-[18px] px-[35px] rounded-xl font-bold cursor-pointer transition-all duration-400 uppercase tracking-wider hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-base";

export const primaryButtonClasses = "bg-gradient-to-tr from-brand-primary-start to-brand-primary-end text-white hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)]";

export const analyticsButtonClasses = "bg-gradient-to-tr from-brand-analytics-start to-brand-analytics-end text-white hover:shadow-[0_10px_25px_rgba(237,137,54,0.4)]";

export const secondaryButtonClasses = "bg-gradient-to-tr from-brand-secondary-start to-brand-secondary-end text-white hover:shadow-[0_10px_25px_rgba(72,187,120,0.4)]";
