# AI SEO Automation Platform - Setup Instructions

## Prerequisites
1. Node.js (version 16 or higher)
2. npm or yarn package manager

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd aiseo
   npm install
   ```

2. **Environment Configuration:**
   The application requires API keys for proper functionality:
   
   - **Clerk Authentication:** For user authentication
   - **Google Gemini API:** For AI-powered SEO analysis and content generation

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `aiseo` directory with the following variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Getting API Keys

### Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

### Clerk Publishable Key
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Create a new application or select an existing one
3. Copy the "Publishable Key" from the application settings
4. Add it to your `.env.local` file as `VITE_CLERK_PUBLISHABLE_KEY`

## Common Issues and Solutions

### "Missing Publishable Key" Error
This error occurs when the `VITE_CLERK_PUBLISHABLE_KEY` environment variable is not properly set. 
Make sure:
1. The `.env.local` file exists in the `aiseo` directory
2. The file contains the `VITE_CLERK_PUBLISHABLE_KEY` variable with a valid key
3. You're running the application from the `aiseo` directory

### API Key Issues
If the application fails to generate content, check that:
1. Your `GEMINI_API_KEY` is valid and active
2. You have not exceeded your API quota