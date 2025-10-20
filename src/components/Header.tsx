import { Search, User, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useState } from 'react';

type HeaderProps = {
  onNavigate: (page: string) => void;
  currentPage: string;
  onConnectWallet: () => void;
};

export default function Header({ onNavigate, currentPage, onConnectWallet }: HeaderProps) {
  const { isConnected, walletAddress, username, solBalance, disconnect } = useWallet();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://i.imgur.com/nBAB1gi.png"
                alt="ALTERFUN"
                className="h-8"
              />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate('creators')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'creators' ? 'text-[#7E34FF]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Creator Lists
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Are you a Streamer?</span>
                <button
                  onClick={() => onNavigate('join')}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#7E34FF] to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  Join Us
                </button>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-2">
                  <input
                    type="text"
                    placeholder="Search creators..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {!isConnected ? (
              <button
                onClick={onConnectWallet}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7E34FF] to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-700">{solBalance.toFixed(2)} SOL</span>
                </div>

                <button
                  onClick={() => onNavigate('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    currentPage === 'profile' ? 'bg-purple-50 text-[#7E34FF]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{username || walletAddress}</span>
                </button>

                <button
                  onClick={disconnect}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
