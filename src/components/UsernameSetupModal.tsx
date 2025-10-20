import { useState } from 'react';
import { User, AlertCircle } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export default function UsernameSetupModal() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUsername: saveUsername } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setLoading(true);
    const success = await saveUsername(username);
    setLoading(false);

    if (!success) {
      setError('Username already taken. Please choose another.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7E34FF] to-[#03EC86] rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 text-center mb-2">
          Welcome to AlterFUN!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Choose a username to get started
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7E34FF] transition-colors"
              disabled={loading}
              autoFocus
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full py-3 bg-gradient-to-r from-[#7E34FF] to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Continue'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your username will be displayed on all your comments and interactions
        </p>
      </div>
    </div>
  );
}
