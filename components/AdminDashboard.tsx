import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { inviteUser, getInvitedUsers, revokeUserInvitation, InvitedUser } from '../services/firebase/userService';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { user } = useFirebase();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Fetch invited users
  useEffect(() => {
    const fetchInvitedUsers = async () => {
      if (user) {
        setLoading(true);
        const users = await getInvitedUsers();
        if (users) {
          setInvitedUsers(users);
        }
        setLoading(false);
      }
    };

    fetchInvitedUsers();
  }, [user]);

  // Handle inviting a new user
  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !email) return;

    setLoading(true);
    const success = await inviteUser(user.uid, email, role);
    setLoading(false);

    if (success) {
      setMessage({ text: 'User invited successfully!', type: 'success' });
      setEmail('');
      // Refresh the list of invited users
      const users = await getInvitedUsers();
      if (users) {
        setInvitedUsers(users);
      }
    } else {
      setMessage({ text: 'Failed to invite user. Please try again.', type: 'error' });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle revoking an invitation
  const handleRevokeInvitation = async (invitationId: string) => {
    setLoading(true);
    const success = await revokeUserInvitation(invitationId);
    setLoading(false);

    if (success) {
      setMessage({ text: 'Invitation revoked successfully!', type: 'success' });
      // Refresh the list of invited users
      const users = await getInvitedUsers();
      if (users) {
        setInvitedUsers(users);
      }
    } else {
      setMessage({ text: 'Failed to revoke invitation. Please try again.', type: 'error' });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Invite User Form */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Invite New User</h3>
            <form onSubmit={handleInviteUser} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Inviting...' : 'Invite'}
                </button>
              </div>
            </form>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Invited Users List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Invited Users</h3>
            {loading && invitedUsers.length === 0 ? (
              <div className="text-center py-4">
                <p>Loading invited users...</p>
              </div>
            ) : invitedUsers.length === 0 ? (
              <div className="text-center py-4">
                <p>No users have been invited yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invited By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invited At
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invitedUsers.map((invitedUser) => (
                      <tr key={invitedUser.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invitedUser.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            invitedUser.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {invitedUser.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invitedUser.invitedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invitedUser.invitedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            invitedUser.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : invitedUser.status === 'accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {invitedUser.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invitedUser.status === 'pending' && (
                            <button
                              onClick={() => handleRevokeInvitation(invitedUser.id)}
                              disabled={loading}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};