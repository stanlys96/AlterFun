"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";

function TradePageContent() {
  const searchParams = useSearchParams();
  const { address, isConnected } = useAppKitAccount();
  // Extract URL parameters
  const tokenAddress = searchParams.get("tokenAddress");
  const tokenName = searchParams.get("tokenName");
  const tokenSymbol = searchParams.get("tokenSymbol");
  const poolAddress = searchParams.get("poolAddress");
  const tradeStatus = searchParams.get("tradeStatus");
  // State management
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Load token data
  useEffect(() => {
    if (tokenAddress && tokenName && tokenSymbol) {
      loadTokenData();
    }
  }, [tokenAddress]);
  return (
    <div className="container mx-auto px-4 pt-32">
      {/* Token Info Card */}
      <TokenInfoCard {...tokenData} />
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left Column: Charts & Transactions */}
        <div className="flex flex-col gap-6">
          <ChartContainer tokenAddress={tokenAddress} />
          <TransactionSection tokenAddress={tokenAddress} />
          <HoldersDistribution tokenAddress={tokenAddress} />
        </div>
        {/* Right Column: Trading & Pool Progress */}
        <div className="flex flex-col gap-6">
          {tradeStatus === "active" && (
            <PoolProgressCard poolAddress={poolAddress} />
          )}
        </div>
      </div>
    </div>
  );
}
export default function TradePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TradePageContent />
    </Suspense>
  );
}
