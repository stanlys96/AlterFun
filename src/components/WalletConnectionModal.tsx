import { X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type WalletConnectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { connectWallet } = useAuth();

  if (!isOpen) return null;

  const handleWalletConnect = async (walletType: 'phantom' | 'solflare') => {
    setLoading(true);
    setError('');

    try {
      await connectWallet(walletType);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
              <p className="text-sm text-gray-600 mt-1">
                To buy and sell, link your Solana wallet to your AlterFUN account
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={() => handleWalletConnect('phantom')}
            disabled={loading}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none">
                <path
                  d="M96.872 38.7279C94.6228 36.0696 91.3962 34.5 87.9778 34.5H40.0222C36.6038 34.5 33.3772 36.0696 31.128 38.7279L8.62795 65.2279C5.12401 69.4137 5.12401 75.5863 8.62795 79.7721L31.128 106.272C33.3772 108.93 36.6038 110.5 40.0222 110.5H87.9778C91.3962 110.5 94.6228 108.93 96.872 106.272L119.372 79.7721C122.876 75.5863 122.876 69.4137 119.372 65.2279L96.872 38.7279Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="64" y1="34.5" x2="64" y2="110.5">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#6D28D9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                Phantom
              </h3>
              <p className="text-sm text-gray-600">Connect with Phantom Wallet</p>
            </div>
          </button>

          <button
            onClick={() => handleWalletConnect('solflare')}
            disabled={loading}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8" viewBox="0 0 128 128" fill="white">
                <path d="M64 12L20 56l44 44 44-44L64 12zm0 12.686L95.314 56 64 87.314 32.686 56 64 24.686z" />
                <circle cx="64" cy="56" r="16" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                Solflare
              </h3>
              <p className="text-sm text-gray-600">Connect with Solflare Wallet</p>
            </div>
          </button>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
              {error}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Secure Connection:</span> Your wallet will never share
              your private keys. You'll approve each transaction individually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
