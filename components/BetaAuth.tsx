import React, { useState, useEffect } from 'react';
import { BETA_CONFIG, validateBetaCredentials, isBetaPeriodActive } from '../config/betaConfig';

interface BetaAuthProps {
  children: React.ReactNode;
}

export const BetaAuth: React.FC<BetaAuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    // Skip auth if beta is disabled
    if (!BETA_CONFIG.enabled) {
      setIsAuthenticated(true);
      return;
    }

    // Check if beta period is active
    if (!isBetaPeriodActive()) {
      setError('Beta testing period has ended. Thank you for your participation!');
      return;
    }

    // Check if user is already authenticated
    const savedAuth = localStorage.getItem('beta-auth');
    if (savedAuth) {
      const { username, expiry } = JSON.parse(savedAuth);
      if (new Date().getTime() < expiry) {
        setIsAuthenticated(true);
        setCurrentUser(username);
      } else {
        localStorage.removeItem('beta-auth');
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = validateBetaCredentials(username, password);

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user.name);
      
      // Save auth with configured session duration
      const authData = {
        username: user.name,
        role: user.role,
        expiry: new Date().getTime() + (BETA_CONFIG.sessionDuration * 60 * 60 * 1000)
      };
      localStorage.setItem('beta-auth', JSON.stringify(authData));
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('beta-auth');
    setUsername('');
    setPassword('');
  };

  // Skip auth if disabled
  if (!BETA_CONFIG.enabled) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI SEO Platform</h1>
            <p className="text-gray-600">Beta Access Only</p>
            {!isBetaPeriodActive() && (
              <p className="text-red-600 mt-2 text-sm">Beta period has ended</p>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter beta username"
                required
                disabled={!isBetaPeriodActive()}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter beta password"
                required
                disabled={!isBetaPeriodActive()}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isBetaPeriodActive()}
            >
              Access Beta
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {showCredentials ? 'Hide' : 'Show'} Beta Credentials
            </button>
            
            {showCredentials && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg text-left">
                <p className="text-xs font-semibold text-gray-700 mb-2">Beta Test Accounts:</p>
                {BETA_CONFIG.users.map((user, index) => (
                  <div key={index} className="text-xs text-gray-600 mb-1">
                    <span className="font-mono">
                      {user.username} / {user.password}
                    </span>
                    <span className="text-gray-500 ml-2">({user.role})</span>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-4">
              Beta Period: {BETA_CONFIG.betaStartDate.toLocaleDateString()} - {BETA_CONFIG.betaEndDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Beta User Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Beta Mode</span> • Logged in as: {currentUser}
            </p>
            {BETA_CONFIG.showFeedbackButton && (
              <a
                href={`mailto:${BETA_CONFIG.feedbackEmail}?subject=Beta Feedback - AI SEO Platform`}
                className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
              >
                Send Feedback
              </a>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-yellow-700 hover:text-yellow-900 underline"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Application */}
      {children}
    </>
  );
};