import { Check, Copy } from "lucide-react";
import { useState } from "react";

// components/tokens/HoldersDistribution.tsx
interface HolderData {
  address: string;
  balance: number;
  percentage: number;
}
const HoldersDistribution: React.FC<{
  tokenAddress: string;
  title?: string;
  showRefresh?: boolean;
  enableRealtime?: boolean;
}> = ({ tokenAddress, title = "Top Holders", showRefresh = true }) => {
  const [holders, setHolders] = useState<HolderData[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const maskAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;
  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  return (
    <div className="bg-[#040A25] rounded-[30px] p-6">
      <h4 className="font-medium text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {holders.slice(0, 10).map((holder, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">#{idx + 1}</span>
              <span
                className="font-mono text-sm text-white cursor-pointer
hover:text-blue-400"
                onClick={() => copyAddress(holder.address)}
              >
                {maskAddress(holder.address)}
              </span>
              <button onClick={() => copyAddress(holder.address)}>
                {copiedAddress === holder.address ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-500" />
                )}
              </button>
            </div>
            <span className="text-white font-medium">
              {holder.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
