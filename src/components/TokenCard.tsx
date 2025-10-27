import { LaunchedTokenData } from "../lib/cyreneSupabase";

interface TokenCardProps {
  token: LaunchedTokenData;
  onTradeClick: (token: LaunchedTokenData) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  onTradeClick,
}) => {
  // "https://ipfs.erebrus.io/ipfs/bafkreih76adu6grssfjdzshkiz6gbvhsdd4zjq2vwe3ptrsg2w76ky4qwa"
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex gap-x-2 items-center">
        <img className="w-[50px] h-[50px]" src={token.projectImage} />
        <div>
          <h3 className="text-xl font-bold">{token.tokenName}</h3>
          <p className="text-gray-600">${token.tokenSymbol}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Contract:</strong> {token.contractAddress}
        </p>
        <p>
          <strong>Pool:</strong> {token.dbcPoolAddress}
        </p>
        <p>
          <strong>Quote Mint:</strong> {token.quoteMint}
        </p>
        <p>
          <strong>Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-sm ${
              token.tradeStatus
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {token.tradeStatus ? "Active" : "Graduated"}
          </span>
        </p>
        {token.isVerified && <p className="text-blue-600">✓ Verified</p>}
      </div>
      <button
        onClick={() => onTradeClick(token)}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Trade
      </button>
    </div>
  );
};
