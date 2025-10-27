import { useNavigate } from "react-router-dom";
import { useLaunchedTokens } from "../hooks/useLaunchedTokens";
import { TokenCard } from "../components";
import { LaunchedTokenData } from "../lib/cyreneSupabase";

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
    return <div className="p-4">Loading launched tokens...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Launched Tokens (Cooking Stage)
      </h1>
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
