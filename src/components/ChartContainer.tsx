// components/tokens/ChartContainer.tsx
"use client";
import { useState } from "react";
interface ChartContainerProps {
  tokenAddress: string;
  price: number;
  timeFrames?: string[];
  defaultTimeFrame?: string;
  height?: number;
}
const ChartContainer: React.FC<ChartContainerProps> = ({
  tokenAddress,
  price,
  timeFrames = ["1H", "1D", "1W", "1M"],
  defaultTimeFrame = "1D",
  height = 320,
}) => {
  const [activeTimeFrame, setActiveTimeFrame] = useState(defaultTimeFrame);
  const getBirdEyeChartUrl = () => {
    const timeframeMap = {
      "1H": "1",
      "1D": "15",
      "1W": "60",
      "1M": "240",
    };
    const interval = timeframeMap[activeTimeFrame] || "15";
    return (
      `https://birdeye.so/tv-widget/${tokenAddress}?` +
      `chain=solana&viewMode=pair&chartInterval=${interval}&` +
      `chartType=Candle&theme=dark`
    );
  };
  return (
    <div className="bg-[#040A25] rounded-[20px] p-4">
      {/* Timeframe Selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeFrame(tf)}
              className={`px-3 py-1 text-xs rounded-md ${
                activeTimeFrame === tf
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          Price:{" "}
          <span className="text-white">
            ${price < 1 ? price.toFixed(6) : price.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Chart Iframe */}
      <div className="relative" style={{ height: `${height}px` }}>
        <iframe
          src={getBirdEyeChartUrl()}
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "12px" }}
          allowFullScreen
        />
      </div>
    </div>
  );
};
export default ChartContainer;
