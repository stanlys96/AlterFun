import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Copy } from "lucide-react";
import { LaunchedTokenData } from "../lib/cyreneSupabase";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "green",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

interface TokenCardProps {
  token: LaunchedTokenData;
  onTradeClick: (token: LaunchedTokenData) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  onTradeClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group bg-gradient-to-br from-white/70 to-white/30 
                 border border-gray-200 rounded-2xl p-5 shadow-lg 
                 backdrop-blur-md hover:shadow-2xl hover:border-blue-400/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={token.projectImage}
          alt={token.tokenName}
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            {token.tokenName}
            {token.isVerified && (
              <CheckCircle className="text-blue-500 w-4 h-4" />
            )}
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            ${token.tokenSymbol}
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Contract</span>
          <div className="flex gap-x-2 items-center">
            <Copy
              onClick={async () => {
                await navigator.clipboard.writeText(token.contractAddress);
                await Toast.fire({
                  icon: "success",
                  title: "Successfully copied contract address!",
                });
              }}
              className="cursor-pointer"
              size={14}
            />
            <span className="truncate max-w-[180px]">
              {token.contractAddress}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Pool</span>
          <div className="flex gap-x-2 items-center">
            <Copy
              onClick={async () => {
                await navigator.clipboard.writeText(token.dbcPoolAddress);
                await Toast.fire({
                  icon: "success",
                  title: "Successfully copied pool address!",
                });
              }}
              className="cursor-pointer"
              size={14}
            />
            <span className="truncate max-w-[180px]">
              {token.dbcPoolAddress}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Quote Mint</span>
          <span>{token.quoteMint}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-500">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              token.tradeStatus
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {token.tradeStatus ? "Active" : "Graduated"}
          </span>
        </div>
      </div>

      {/* Trade Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onTradeClick(token)}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold 
                   py-2 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Trade <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl pointer-events-none"></div>
    </motion.div>
  );
};
