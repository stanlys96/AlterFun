import { Wallet, X } from "lucide-react";
type ConnectWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ConnectWalletModal({
  isOpen,
  onClose,
}: ConnectWalletModalProps) {
  if (!isOpen) return null;

  const handleConnect = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose your preferred wallet to connect to AlterFUN
        </p>

        <div className="space-y-3">
          <button
            onClick={handleConnect}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Phantom
              </div>
              <div className="text-sm text-gray-500">
                Connect with Phantom Wallet
              </div>
            </div>
          </button>

          <button
            onClick={handleConnect}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Solflare
              </div>
              <div className="text-sm text-gray-500">
                Connect with Solflare Wallet
              </div>
            </div>
          </button>

          <button
            onClick={handleConnect}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Backpack
              </div>
              <div className="text-sm text-gray-500">
                Connect with Backpack Wallet
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Don't have a wallet?{" "}
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Get Phantom
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
