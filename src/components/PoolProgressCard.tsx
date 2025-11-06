// components/trade/PoolProgressCard.tsx
import { DynamicBondingCurveClient } from "@meteora-ag/dynamic-bonding-curve-sdk";
import { PublicKey, Connection } from "@solana/web3.js";
const PoolProgressCard: React.FC<{
  poolAddress: string;
  refreshInterval?: number;
}> = ({ poolAddress, refreshInterval = 15000 }) => {
  const [progression, setProgression] = useState<string | null>(null);
  const [isGraduated, setIsGraduated] = useState(false);
  const getPoolProgression = async () => {
    const connection = new Connection(
      `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
    );
    const client = new DynamicBondingCurveClient(connection, "confirmed");
    const poolPubkey = new PublicKey(poolAddress);
    const progress = await client.state.getPoolCurveProgress(poolPubkey);
    const hasGraduated = progress >= 1;
    setIsGraduated(hasGraduated);
    setProgression(Math.min(progress * 100, 100).toFixed(2) + "%");
  };
  useEffect(() => {
    getPoolProgression();
    const interval = setInterval(getPoolProgression, refreshInterval);
    return () => clearInterval(interval);
  }, [poolAddress]);
  if (isGraduated) {
    return (
      <div
        className="bg-gradient-to-r from-green-600/20 to-emerald-600/20
rounded-xl p-4 border border-green-500/30"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">■</div>
          <h3 className="text-white font-semibold">Pool Graduated!</h3>
        </div>
      </div>
    );
  }
  return (
    <div
      className="bg-gradient-to-r from-blue-600/20 to-blue-400/20
rounded-xl p-6 border border-blue-500/30"
    >
      <h3 className="text-white font-semibold mb-3">Pool Progress</h3>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">Progress:</span>
        <span className="text-lg font-bold text-blue-400">{progression}</span>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400
transition-all duration-500"
          style={{ width: progression || "0%" }}
        />
      </div>
    </div>
  );
};
