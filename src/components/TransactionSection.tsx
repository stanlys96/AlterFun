// components/tokens/TransactionSection.tsx
interface Transaction {
  id: string;
  time: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  total: number;
  wallet: string;
  signature?: string;
  timestamp: number;
}
interface TransactionSectionProps {
  tokenAddress?: string;
  transactions?: Transaction[];
  limit?: number;
  showRefresh?: boolean;
  autoRefresh?: boolean;
  enableRealtime?: boolean;
}
const TransactionSection: React.FC<TransactionSectionProps> = ({
  tokenAddress,
  limit = 15,
  showRefresh = true,
  autoRefresh = true,
  enableRealtime = true,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch transactions
  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      // Fetch from your API or blockchain
      const data = await fetchTransactions(tokenAddress, limit);
      setTransactions(data);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (tokenAddress) {
      loadTransactions();
      // Set up auto-refresh
      if (autoRefresh) {
        const interval = setInterval(loadTransactions, 15000);
        return () => clearInterval(interval);
      }
    }
  }, [tokenAddress]);
  return (
    <div className="bg-[#040A25] rounded-[30px] p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">Live Transactions</h3>
        {showRefresh && (
          <button onClick={loadTransactions} disabled={isLoading}>
            <RefreshCw className={isLoading ? "animate-spin" : ""} />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between p-2
hover:bg-white/5 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  tx.type === "buy"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {tx.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-400">{tx.time}</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">{tx.amount} tokens</div>
              <div className="text-xs text-gray-500">${tx.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
