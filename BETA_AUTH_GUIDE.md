# Beta Authentication Guide

## Overview
This guide explains how to manage beta authentication for the AI SEO Platform during the testing phase.

## Current Beta Users

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| beta1 | seo2024beta | Tester | Beta Tester 1 |
| beta2 | test2024seo | Tester | Beta Tester 2 |
| demo | demo123 | Demo | Demo User |
| admin | admin2024seo | Admin | Admin User |

## Configuration

All beta settings are managed in `/config/betaConfig.ts`:

```typescript
// To disable authentication (after beta):
BETA_CONFIG.enabled = false

// To add new beta users:
users: [
  {
    username: 'newuser',
    password: 'newpass123',
    name: 'New Beta User',
    email: 'newuser@example.com',
    role: 'tester'
  }
]

// To change beta period:
betaStartDate: new Date('2024-01-01'),
betaEndDate: new Date('2024-03-31'),
```

## Features

1. **Session Management**: 24-hour sessions with automatic logout
2. **Beta Period Control**: Automatic lockout after beta end date
3. **Show/Hide Credentials**: Toggle button for easy access during testing
4. **Feedback Integration**: Built-in feedback button for beta testers
5. **Role-Based Access**: Different roles for different user types

## Implementation

The authentication is implemented as a wrapper component in `index.tsx`:

```typescript
<BetaAuth>
  <App />
</BetaAuth>
```

## Removing Beta Auth After Testing

To remove beta authentication after testing:

1. **Option 1 - Disable Only**:
   - Set `BETA_CONFIG.enabled = false` in `/config/betaConfig.ts`
   - Authentication will be bypassed but code remains for future use

2. **Option 2 - Complete Removal**:
   - Remove `<BetaAuth>` wrapper from `index.tsx`
   - Delete `/components/BetaAuth.tsx`
   - Delete `/config/betaConfig.ts`
   - Update `index.tsx` to render `<App />` directly

## Security Notes

⚠️ **Important**: This authentication is for beta testing only and should NOT be used in production:
- Passwords are stored in plain text in the code
- No encryption or hashing
- No password reset functionality
- No user registration

## Alternative: Clerk Integration

If you prefer a more robust solution, you can integrate Clerk:

1. Install Clerk: `npm install @clerk/clerk-react`
2. Set up Clerk account and get API keys
3. Configure invite-only mode in Clerk dashboard
4. Replace BetaAuth with ClerkProvider

However, for 2-3 beta testers, the simple hardcoded solution is recommended as it:
- Requires no external dependencies
- Has zero cost
- Is easy to remove
- Doesn't complicate the codebase

## Testing the Authentication

1. Start the development server
2. Navigate to the application
3. You'll see the login screen
4. Use any of the beta credentials above
5. After login, you'll see a yellow beta banner
6. Click "Logout" to end the session

## Customization

You can customize the authentication by modifying:
- Login page design in `BetaAuth.tsx`
- Session duration in `betaConfig.ts`
- User roles and permissions
- Beta period dates
- Feedback email address