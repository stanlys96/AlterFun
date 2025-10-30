import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";
import { supabase, Creator } from "../lib/supabase";

type MarketDiscoveryProps = {
  onNavigate: (page: string, slug?: string) => void;
};

export default function MarketDiscovery({ onNavigate }: MarketDiscoveryProps) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [sortBy, setSortBy] = useState<string>("market_cap");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minMarketCap: "",
    maxMarketCap: "",
    minHolders: "",
    minGrowth: "",
  });

  useEffect(() => {
    loadCreators();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [creators, sortBy, filters]);

  const loadCreators = async () => {
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .eq("enabled", true)
      .order("market_cap", { ascending: false });

    if (!error && data) {
      setCreators(data);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...creators];

    if (filters.minMarketCap) {
      filtered = filtered.filter(
        (c) => c.market_cap >= parseFloat(filters.minMarketCap)
      );
    }
    if (filters.maxMarketCap) {
      filtered = filtered.filter(
        (c) => c.market_cap <= parseFloat(filters.maxMarketCap)
      );
    }
    if (filters.minHolders) {
      filtered = filtered.filter(
        (c) => c.holder_count >= parseInt(filters.minHolders)
      );
    }
    if (filters.minGrowth) {
      filtered = filtered.filter(
        (c) => c.price_change_24h >= parseFloat(filters.minGrowth)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_change":
          return b.price_change_24h - a.price_change_24h;
        case "volume":
          return b.volume_24h - a.volume_24h;
        case "holders":
          return b.holder_count - a.holder_count;
        case "market_cap":
        default:
          return b.market_cap - a.market_cap;
      }
    });

    setFilteredCreators(filtered);
  };

  const topMovers = [...creators]
    .sort((a, b) => b.price_change_24h - a.price_change_24h)
    .slice(0, 3);
  const highestBuzz = [...creators]
    .sort((a, b) => b.volume_24h - a.volume_24h)
    .slice(0, 3);
  const fastestGrowing = [...creators]
    .sort((a, b) => b.holder_count - a.holder_count)
    .slice(0, 3);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#7E34FF] via-purple-600 to-[#03EC86] bg-clip-text text-transparent">
          Now Trending
        </h1>
        <p className="text-gray-600">Discover the hottest virtual streamers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#03EC86]" />
            <h3 className="font-bold text-gray-900">Top Movers (24h)</h3>
          </div>
          <div className="space-y-3">
            {topMovers.map((creator, idx) => (
              <button
                key={creator.id}
                onClick={() =>
                  onNavigate(`creator/${creator.slug}`, creator.slug)
                }
                className="w-full flex items-center gap-3 p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="text-lg font-bold text-[#03EC86]">
                  #{idx + 1}
                </span>
                <img
                  src={creator.avatar_url}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    {creator.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatNumber(creator.market_cap)} USD
                  </div>
                </div>
                <div className="text-[#03EC86] font-bold text-sm">
                  +{creator.price_change_24h.toFixed(1)}%
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#7E34FF]" />
            <h3 className="font-bold text-gray-900">Highest Buzz (Volume)</h3>
          </div>
          <div className="space-y-3">
            {highestBuzz.map((creator, idx) => (
              <button
                key={creator.id}
                onClick={() =>
                  onNavigate(`creator/${creator.slug}`, creator.slug)
                }
                className="w-full flex items-center gap-3 p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="text-lg font-bold text-[#7E34FF]">
                  #{idx + 1}
                </span>
                <img
                  src={creator.avatar_url}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    {creator.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatNumber(creator.volume_24h)} USD
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#7E34FF]" />
            <h3 className="font-bold text-gray-900">
              Fastest Growing (Holders)
            </h3>
          </div>
          <div className="space-y-3">
            {fastestGrowing.map((creator, idx) => (
              <button
                key={creator.id}
                onClick={() =>
                  onNavigate(`creator/${creator.slug}`, creator.slug)
                }
                className="w-full flex items-center gap-3 p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="text-lg font-bold text-[#7E34FF]">
                  #{idx + 1}
                </span>
                <img
                  src={creator.avatar_url}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    {creator.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {creator.holder_count} holders
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Creator Lists</h2>
            <button
              onClick={() => onNavigate("creators")}
              className="text-sm text-[#7E34FF] hover:text-purple-700 font-medium transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
            >
              <option value="market_cap">Market Cap</option>
              <option value="price_change">24h Change</option>
              <option value="volume">Volume</option>
              <option value="holders">Holders</option>
            </select>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="p-4 bg-gray-50 border-b border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="number"
              placeholder="Min Market Cap"
              value={filters.minMarketCap}
              onChange={(e) =>
                setFilters({ ...filters, minMarketCap: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
            />
            <input
              type="number"
              placeholder="Max Market Cap"
              value={filters.maxMarketCap}
              onChange={(e) =>
                setFilters({ ...filters, maxMarketCap: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
            />
            <input
              type="number"
              placeholder="Min Holders"
              value={filters.minHolders}
              onChange={(e) =>
                setFilters({ ...filters, minHolders: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
            />
            <input
              type="number"
              placeholder="Min Growth %"
              value={filters.minGrowth}
              onChange={(e) =>
                setFilters({ ...filters, minGrowth: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Key Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Holders
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredCreators.map((creator) => (
                <tr
                  key={creator.id}
                  onClick={() =>
                    onNavigate(`creator/${creator.slug}`, creator.slug)
                  }
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar_url}
                        alt={creator.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {creator.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatNumber(creator.subscribers)} subs
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-semibold text-gray-900">
                      {creator.key_price} USD
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div
                      className={`flex items-center justify-end gap-1 font-semibold ${
                        creator.price_change_24h >= 0
                          ? "text-[#03EC86]"
                          : "text-red-600"
                      }`}
                    >
                      {creator.price_change_24h >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(creator.price_change_24h).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-medium text-gray-900">
                      {formatNumber(creator.market_cap)} USD
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-medium text-gray-900">
                      {creator.holder_count}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
