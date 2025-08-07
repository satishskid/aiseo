// Beta Testing Configuration
// IMPORTANT: Remove this file and authentication after beta testing

export interface BetaUser {
  username: string;
  password: string;
  name: string;
  email?: string;
  role?: 'admin' | 'tester' | 'demo';
  expiresAt?: Date;
}

export const BETA_CONFIG = {
  // Enable/disable beta authentication
  enabled: true,
  
  // Session duration in hours
  sessionDuration: 24,
  
  // Beta users list
  users: [
    {
      username: 'beta1',
      password: 'seo2024beta',
      name: 'Beta Tester 1',
      email: 'beta1@example.com',
      role: 'tester' as const,
    },
    {
      username: 'beta2',
      password: 'test2024seo',
      name: 'Beta Tester 2',
      email: 'beta2@example.com',
      role: 'tester' as const,
    },
    {
      username: 'demo',
      password: 'demo123',
      name: 'Demo User',
      role: 'demo' as const,
    },
    {
      username: 'admin',
      password: 'admin2024seo',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as const,
    }
  ] as BetaUser[],
  
  // Beta testing period
  betaStartDate: new Date('2024-01-01'),
  betaEndDate: new Date('2024-03-31'),
  
  // Features available in beta
  betaFeatures: {
    maxProjects: 5,
    maxExportsPerDay: 10,
    allowedAIProviders: ['gemini', 'groq'],
    debugMode: false,
  },
  
  // Beta feedback configuration
  feedbackEmail: 'feedback@aiseoplatform.com',
  showFeedbackButton: true,
};

// Helper function to check if beta period is active
export const isBetaPeriodActive = (): boolean => {
  const now = new Date();
  return now >= BETA_CONFIG.betaStartDate && now <= BETA_CONFIG.betaEndDate;
};

// Helper function to get user by username
export const getBetaUser = (username: string): BetaUser | undefined => {
  return BETA_CONFIG.users.find(user => user.username === username);
};

// Helper function to validate credentials
export const validateBetaCredentials = (username: string, password: string): BetaUser | null => {
  const user = BETA_CONFIG.users.find(
    u => u.username === username && u.password === password
  );
  return user || null;
};