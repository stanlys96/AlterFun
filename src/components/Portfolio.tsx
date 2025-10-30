import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import { supabase, Creator } from "../lib/supabase";

type PortfolioProps = {
  onNavigate: (page: string, slug?: string) => void;
};

type HoldingWithCreator = {
  id: string;
  keys_held: number;
  avg_buy_price: number;
  creator: Creator;
};

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [holdings, setHoldings] = useState<HoldingWithCreator[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    const mockHoldings: HoldingWithCreator[] = [];

    const { data: creatorsData } = await supabase
      .from("creators")
      .select("*")
      .eq("enabled", true)
      .in("slug", ["miko-sakura", "aria-volt", "kira-neon"]);

    if (creatorsData) {
      creatorsData.forEach((creator, idx) => {
        const keysHeld = [150, 85, 200][idx];
        const avgBuyPrice = [7.2, 11.8, 5.5][idx];

        mockHoldings.push({
          id: `holding-${idx}`,
          keys_held: keysHeld,
          avg_buy_price: avgBuyPrice,
          creator,
        });
      });

      setHoldings(mockHoldings);

      let totalVal = 0;
      let totalProfit = 0;

      mockHoldings.forEach((holding) => {
        const currentValue = holding.keys_held * holding.creator.key_price;
        const costBasis = holding.keys_held * holding.avg_buy_price;
        totalVal += currentValue;
        totalProfit += currentValue - costBasis;
      });

      setTotalValue(totalVal);
      setTotalPnL(totalProfit);
    }
  };

  const calculatePnL = (holding: HoldingWithCreator) => {
    const currentValue = holding.keys_held * holding.creator.key_price;
    const costBasis = holding.keys_held * holding.avg_buy_price;
    return currentValue - costBasis;
  };

  const calculatePnLPercent = (holding: HoldingWithCreator) => {
    const costBasis = holding.keys_held * holding.avg_buy_price;
    const pnl = calculatePnL(holding);
    return (pnl / costBasis) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Portfolio
        </h1>
        <p className="text-gray-600">Track your investments and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-sm font-medium opacity-90">
              Total Portfolio Value
            </h3>
          </div>
          <div className="text-4xl font-black mb-1">
            {totalValue.toFixed(2)} USD
          </div>
          <div className="text-sm opacity-75">
            ≈ ${(totalValue * 95).toFixed(2)} USD
          </div>
        </div>

        <div
          className={`rounded-xl p-6 text-white shadow-lg ${
            totalPnL >= 0
              ? "bg-gradient-to-br from-green-500 to-green-600"
              : "bg-gradient-to-br from-red-500 to-red-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {totalPnL >= 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <h3 className="text-sm font-medium opacity-90">Overall P&L</h3>
          </div>
          <div className="text-4xl font-black mb-1">
            {totalPnL >= 0 ? "+" : ""}
            {totalPnL.toFixed(2)} USD
          </div>
          <div className="text-sm opacity-75">
            {totalPnL >= 0 ? "+" : ""}
            {((totalPnL / (totalValue - totalPnL)) * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">My Holdings</h2>
        </div>

        {holdings.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              You don't have any holdings yet
            </p>
            <button
              onClick={() => onNavigate("")}
              className="px-6 py-2 bg-gradient-to-r from-[#7E34FF] to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Discover Creators
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Creator
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Keys Held
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Avg. Buy Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    P&L
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {holdings.map((holding) => {
                  const pnl = calculatePnL(holding);
                  const pnlPercent = calculatePnLPercent(holding);
                  const totalValue =
                    holding.keys_held * holding.creator.key_price;

                  return (
                    <tr
                      key={holding.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            onNavigate(
                              `creator/${holding.creator.slug}`,
                              holding.creator.slug
                            )
                          }
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={holding.creator.avatar_url}
                            alt={holding.creator.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              {holding.creator.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {holding.creator.slug}
                            </div>
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="font-semibold text-gray-900">
                          {holding.keys_held.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-gray-600">
                          {holding.avg_buy_price.toFixed(2)} USD
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="font-semibold text-gray-900">
                          {holding.creator.key_price.toFixed(2)} USD
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="font-semibold text-gray-900">
                          {totalValue.toFixed(2)} USD
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div
                          className={`font-semibold ${
                            pnl >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {pnl >= 0 ? "+" : ""}
                          {pnl.toFixed(2)} USD
                        </div>
                        <div
                          className={`text-sm ${
                            pnl >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {pnl >= 0 ? "+" : ""}
                          {pnlPercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              onNavigate(
                                `creator/${holding.creator.slug}`,
                                holding.creator.slug
                              )
                            }
                            className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() =>
                              onNavigate(
                                `creator/${holding.creator.slug}`,
                                holding.creator.slug
                              )
                            }
                            className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
