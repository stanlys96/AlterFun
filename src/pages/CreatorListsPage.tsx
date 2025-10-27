import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Filter, Search } from "lucide-react";
import { supabase, Creator } from "../lib/supabase";

type CreatorListsProps = {
  onNavigate: (page: string, slug?: string) => void;
};

export const CreatorListsPage = ({ onNavigate }: CreatorListsProps) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [sortBy, setSortBy] = useState<string>("market_cap");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
  }, [creators, sortBy, filters, searchQuery]);

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

    if (searchQuery) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#7E34FF] via-purple-600 to-[#03EC86] bg-clip-text text-transparent">
          Creator Lists
        </h1>
        <p className="text-gray-600">
          Browse and discover all virtual streamers
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
              />
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
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors ${
                  filterOpen
                    ? "border-[#7E34FF] bg-purple-50 text-[#7E34FF]"
                    : "border-gray-300"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Rank
                </th>
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
                  Volume (24h)
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Holders
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredCreators.map((creator, index) => (
                <tr
                  key={creator.id}
                  onClick={() => onNavigate("creator", creator.slug)}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      #{index + 1}
                    </div>
                  </td>
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
                      {creator.key_price.toFixed(2)} SOL
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
                      {formatNumber(creator.market_cap)} SOL
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-medium text-gray-900">
                      {formatNumber(creator.volume_24h)} SOL
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

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No creators found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
