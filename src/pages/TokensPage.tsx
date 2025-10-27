import { useNavigate } from "react-router-dom";
import { useLaunchedTokens } from "../hooks/useLaunchedTokens";
import { TokenCard } from "../components";
import { LaunchedTokenData } from "../lib/cyreneSupabase";
import { ClipLoader } from "react-spinners";

export const TokensPage = () => {
  const navigate = useNavigate();
  const { tokens, loading, error } = useLaunchedTokens();
  const handleTradeClick = (token: LaunchedTokenData) => {
    const params = new URLSearchParams({
      tokenAddress: token.contractAddress,
      tokenName: token.tokenName,
      tokenSymbol: token.tokenSymbol,
      poolAddress: token.dbcPoolAddress || "",
      metadataUri: token.metadataUri || "",
      tradeStatus: token.tradeStatus ? "active" : "graduated",
    });
    const tradeUrl = `https://afun.cyreneai.com/trade?${params.toString()}`;
    window.open(tradeUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading Launched Tokens...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="text-center py-6 mb-10 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Launched Tokens
        </h1>
        <p className="text-xl font-medium text-gray-600 mt-2">
          (Phase: Cooking Stage)
        </p>
      </div>
      {tokens.length === 0 ? (
        <p className="text-gray-600">No cooking stage tokens found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <TokenCard
              key={token.contractAddress}
              token={token}
              onTradeClick={handleTradeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
