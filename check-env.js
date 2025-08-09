import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: resolve(__dirname, '.env.local') });

console.log('Environment Variables Check:');
console.log('==========================');

// Check Clerk Publishable Key
const clerkKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
if (clerkKey) {
  console.log('✓ VITE_CLERK_PUBLISHABLE_KEY is set');
  console.log('  Key starts with:', clerkKey.substring(0, 10) + '...');
} else {
  console.log('✗ VITE_CLERK_PUBLISHABLE_KEY is missing');
}

// Check Gemini API Key
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey) {
  console.log('✓ GEMINI_API_KEY is set');
  console.log('  Key starts with:', geminiKey.substring(0, 10) + '...');
} else {
  console.log('✗ GEMINI_API_KEY is missing');
}

console.log('\nTo run the application:');
console.log('1. cd aiseo');
console.log('2. npm run dev');