import React, { useState } from 'react';
import { DEMO_USERS, validateDemoUser, type DemoUser } from '../demoUsers';

interface DemoAuthScreenProps {
  onLogin: (user: DemoUser) => void;
}

export const DemoAuthScreen: React.FC<DemoAuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief loading time for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = validateDemoUser(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password. Try one of the demo accounts below.');
    }
    setIsLoading(false);
  };

  const handleDemoLogin = async (user: DemoUser) => {
    setIsLoading(true);
    setUsername(user.username);
    setPassword(user.password);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' patternUnits='userSpaceOnUse' width='100' height='100'><circle cx='20' cy='20' r='1' fill='%23e2e8f0' opacity='0.4'/><circle cx='80' cy='80' r='1' fill='%23cbd5e1' opacity='0.3'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>')] opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Main Login Card */}
        <div className="glass-effect rounded-3xl shadow-depth p-8 border border-white/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-primary-start to-brand-primary-end rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-depth">
              <span className="text-2xl">🤖</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              AI SEO Platform
            </h1>
            <p className="text-gray-700 font-medium">
              Sign in to access your SEO automation dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white hover:bg-gray-50 focus:outline-none focus:border-brand-primary-start focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] shadow-elegant"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white hover:bg-gray-50 focus:outline-none focus:border-brand-primary-start focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] shadow-elegant"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-primary-start to-brand-primary-end text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-depth hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 flex items-center justify-center gap-2 shadow-elegant"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Users Card */}
        <div className="mt-6">
          <button
            onClick={() => setShowDemoUsers(!showDemoUsers)}
            className="w-full glass-effect rounded-2xl p-4 border border-white/50 shadow-elegant hover:shadow-depth transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                🎭 Demo Accounts Available
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showDemoUsers ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {showDemoUsers && (
            <div className="mt-4 glass-effect rounded-2xl p-6 border border-white/50 shadow-depth animate-contentAppear">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Demo User Accounts</h3>
              <div className="grid gap-3 max-h-80 overflow-y-auto">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user)}
                    disabled={isLoading}
                    className="text-left p-4 bg-white/70 rounded-xl border border-gray-100 hover:bg-white hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          {user.company} • {user.industry}
                        </div>
                        <div className="text-xs text-brand-primary-start font-medium mt-1">
                          @{user.username}
                        </div>
                      </div>
                      <div className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {user.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Quick Access:</strong> Click any demo account above to login instantly, or use the credentials manually in the form.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
