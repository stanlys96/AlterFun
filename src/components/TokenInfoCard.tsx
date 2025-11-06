interface TokenInfoCardProps {
  symbol: string;
  name: string;
  description: string;
  image: string;
  marketCapDisplay: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

const TokenInfoCard: React.FC<TokenInfoCardProps> = ({
  symbol,
  name,
  description,
  image,
  marketCapDisplay,
  metrics,
}) => {
  return (
    <div className="bg-[#040A25] rounded-[30px] p-6 border border-gray-700/30">
      <div className="flex gap-4 items-start">
        {/* Token Image */}
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        {/* Token Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{symbol}</h2>
          <h3 className="text-lg text-gray-400">{name}</h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {description}
          </p>
        </div>
        {/* Market Cap Badge */}
        <div className="bg-blue-600/20 px-4 py-2 rounded-lg">
          <div className="text-xs text-gray-400">Market Cap</div>
          <div className="text-lg font-bold text-white">{marketCapDisplay}</div>
        </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="text-center">
            <div className="text-xs text-gray-500">{metric.label}</div>
            <div className="text-sm font-medium text-white mt-1">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenInfoCard;
