import { useState, useMemo, useEffect } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  TrendingUp,
  TrendingDown,
  Filter,
  SlidersHorizontal,
  Trophy,
  Users,
  DollarSign,
  Youtube,
  Twitch,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../components/ui/pagination";
import { supabase } from "../lib/supabase";
import { useLaunchedTokens } from "../hooks/useLaunchedTokens";
import { fetchDexScreenerData } from "../services/tokenDataService";
import { XIcon } from "../components/icons";

type Creator = {
  name: string;
  avatar: string;
  tokenPrice: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  socials: {
    twitter?: string;
    youtube?: string;
    twitch?: string;
  };
};

type SortField =
  | "tokenPrice"
  | "change24h"
  | "marketCap"
  | "volume24h"
  | "holders";
type SortDirection = "asc" | "desc";

type DiscoverPageProps = {
  onCreatorClick: (creatorName: string) => void;
};

export function DiscoverPage({ onCreatorClick }: DiscoverPageProps) {
  const { tokens } = useLaunchedTokens();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Range filters - temporary state
  const [tempPriceMin, setTempPriceMin] = useState("");
  const [tempPriceMax, setTempPriceMax] = useState("");
  const [tempMarketCapMin, setTempMarketCapMin] = useState("");
  const [tempMarketCapMax, setTempMarketCapMax] = useState("");
  const [tempVolumeMin, setTempVolumeMin] = useState("");
  const [tempVolumeMax, setTempVolumeMax] = useState("");
  const [tempHoldersMin, setTempHoldersMin] = useState("");
  const [tempHoldersMax, setTempHoldersMax] = useState("");

  // Applied filters
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [marketCapMin, setMarketCapMin] = useState("");
  const [marketCapMax, setMarketCapMax] = useState("");
  const [volumeMin, setVolumeMin] = useState("");
  const [volumeMax, setVolumeMax] = useState("");
  const [holdersMin, setHoldersMin] = useState("");
  const [holdersMax, setHoldersMax] = useState("");

  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

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
  }, [creators, sortBy, filters, searchQuery]);

  const loadCreators = async () => {
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .eq("enabled", true)
      .order("market_cap", { ascending: false });

    if (!error && data) {
      const result = [];
      for (let i = 0; i < data?.length; i++) {
        if (data[i]?.token_address) {
          const [dexData] = await Promise.all([
            fetchDexScreenerData(data[i]?.token_address || ""),
          ]);
          const currentCreator = {
            ...data[i],
            key_price: dexData?.priceUsd ? parseFloat(dexData.priceUsd) : 0,
            market_cap: dexData?.marketCap || 0,
            volume_24h: dexData?.volume?.h24 || 0,
            holder_count: dexData?.info?.holders || 0,
            change24h: dexData?.priceChange?.h24 || 0,
          };
          result.push(currentCreator);
        } else {
          result.push(data[i]);
        }
      }

      setCreators(result);
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "change24h" ? "desc" : "desc");
    }
  };

  const applyFilters = () => {
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setMarketCapMin(tempMarketCapMin);
    setMarketCapMax(tempMarketCapMax);
    setVolumeMin(tempVolumeMin);
    setVolumeMax(tempVolumeMax);
    setHoldersMin(tempHoldersMin);
    setHoldersMax(tempHoldersMax);
    setFilterSheetOpen(false);
  };

  const filteredAndSortedCreators = useMemo(() => {
    let filtered = filteredCreators.filter((creator) => {
      const matchesSearch = creator.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Range filters
      const matchesPrice =
        (!priceMin || creator.tokenPrice >= parseFloat(priceMin)) &&
        (!priceMax || creator.tokenPrice <= parseFloat(priceMax));

      const matchesMarketCap =
        (!marketCapMin || creator.marketCap >= parseFloat(marketCapMin)) &&
        (!marketCapMax || creator.marketCap <= parseFloat(marketCapMax));

      const matchesVolume =
        (!volumeMin || creator.volume24h >= parseFloat(volumeMin)) &&
        (!volumeMax || creator.volume24h <= parseFloat(volumeMax));

      const matchesHolders =
        (!holdersMin || creator.holders >= parseInt(holdersMin)) &&
        (!holdersMax || creator.holders <= parseInt(holdersMax));

      return (
        matchesSearch &&
        matchesPrice &&
        matchesMarketCap &&
        matchesVolume &&
        matchesHolders
      );
    });

    filtered.sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return (a[sortField] - b[sortField]) * multiplier;
    });

    return filtered;
  }, [
    searchQuery,
    sortField,
    sortDirection,
    priceMin,
    priceMax,
    marketCapMin,
    marketCapMax,
    volumeMin,
    volumeMax,
    holdersMin,
    holdersMax,
  ]);

  // Reset to page 1 when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    sortField,
    sortDirection,
    priceMin,
    priceMax,
    marketCapMin,
    marketCapMax,
    volumeMin,
    volumeMax,
    holdersMin,
    holdersMax,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedCreators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCreators = filteredAndSortedCreators.slice(
    startIndex,
    endIndex
  );

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const formatSOL = (value: number) => {
    return `${value?.toFixed(6)} USD`;
  };

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactUSD = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000)?.toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000)?.toFixed(2)}K`;
    }
    return formatUSD(value);
  };

  const clearFilters = () => {
    setTempPriceMin("");
    setTempPriceMax("");
    setTempMarketCapMin("");
    setTempMarketCapMax("");
    setTempVolumeMin("");
    setTempVolumeMax("");
    setTempHoldersMin("");
    setTempHoldersMax("");
    setPriceMin("");
    setPriceMax("");
    setMarketCapMin("");
    setMarketCapMax("");
    setVolumeMin("");
    setVolumeMax("");
    setHoldersMin("");
    setHoldersMax("");
    setFilterSheetOpen(false);
  };

  const hasActiveFilters =
    priceMin ||
    priceMax ||
    marketCapMin ||
    marketCapMax ||
    volumeMin ||
    volumeMax ||
    holdersMin ||
    holdersMax;

  const SortButton = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <span>{label}</span>
      {sortField === field &&
        (sortDirection === "asc" ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        ))}
      {sortField !== field && <ArrowUpDown className="w-3 h-3 opacity-40" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl mb-4 font-bold">Discover Creators</h1>
          <p className="text-xl text-gray-600">
            Explore and invest in tokenized creator IPs on the AlterFUN platform
          </p>
        </div>

        {/* Top Performers Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[#03EC86]">
                <TrendingUp className="w-5 h-5" />
                Top Growth (24h)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topGrowth.map((creator, index) => (
                <div key={creator.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#03EC86] text-gray-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {creator.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatSOL(creator.tokenPrice)}
                    </div>
                  </div>
                  <div className="text-[#03EC86] font-semibold">
                    +{creator.change24h}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[#7E34FF]">
                <DollarSign className="w-5 h-5" />
                Top Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topMarketCap.map((creator, index) => (
                <div key={creator.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7E34FF] text-white flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {creator.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatSOL(creator.tokenPrice)}
                    </div>
                  </div>
                  <div className="text-[#7E34FF] font-semibold text-sm">
                    {formatCompactUSD(creator.marketCap)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[#03EC86]">
                <Users className="w-5 h-5" />
                Most Holders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topHolders.map((creator, index) => (
                <div key={creator.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#03EC86] text-gray-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {creator.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatSOL(creator.tokenPrice)}
                    </div>
                  </div>
                  <div className="text-[#03EC86] font-semibold">
                    {creator.holders.toLocaleString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div> */}

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            {/* Mobile Sort */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-white">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                  <SheetTitle>Sort By</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 mt-6">
                  {[
                    { field: "tokenPrice" as SortField, label: "Token Price" },
                    { field: "change24h" as SortField, label: "24h Change" },
                    { field: "marketCap" as SortField, label: "Market Cap" },
                    { field: "volume24h" as SortField, label: "24h Volume" },
                    // { field: "holders" as SortField, label: "Holders" },
                  ].map(({ field, label }) => (
                    <button
                      key={field}
                      onClick={() => {
                        handleSort(field);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        sortField === field
                          ? "border-[#7E34FF] bg-[#7E34FF]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium">{label}</span>
                      {sortField === field && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {sortDirection === "asc"
                              ? "Low to High"
                              : "High to Low"}
                          </span>
                          {sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4 text-[#7E34FF]" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-[#7E34FF]" />
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Advanced Filters */}
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="bg-white relative">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7E34FF] text-white text-xs rounded-full flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader className="px-6">
                  <SheetTitle>Advanced Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6 px-6 pb-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="font-semibold">Price Range (SOL)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Min
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tempPriceMin}
                          onChange={(e) => setTempPriceMin(e.target.value)}
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Max
                        </Label>
                        <Input
                          type="number"
                          placeholder="∞"
                          value={tempPriceMax}
                          onChange={(e) => setTempPriceMax(e.target.value)}
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Market Cap Range */}
                  <div className="space-y-3">
                    <Label className="font-semibold">
                      Market Cap Range (USD)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Min
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tempMarketCapMin}
                          onChange={(e) => setTempMarketCapMin(e.target.value)}
                          step="1000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Max
                        </Label>
                        <Input
                          type="number"
                          placeholder="∞"
                          value={tempMarketCapMax}
                          onChange={(e) => setTempMarketCapMax(e.target.value)}
                          step="1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Volume Range */}
                  <div className="space-y-3">
                    <Label className="font-semibold">
                      24h Volume Range (USD)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Min
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tempVolumeMin}
                          onChange={(e) => setTempVolumeMin(e.target.value)}
                          step="1000"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Max
                        </Label>
                        <Input
                          type="number"
                          placeholder="∞"
                          value={tempVolumeMax}
                          onChange={(e) => setTempVolumeMax(e.target.value)}
                          step="1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Holders Range */}
                  {/* <div className="space-y-3">
                    <Label className="font-semibold">Holders Range</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Min
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tempHoldersMin}
                          onChange={(e) => setTempHoldersMin(e.target.value)}
                          step="10"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1">
                          Max
                        </Label>
                        <Input
                          type="number"
                          placeholder="∞"
                          value={tempHoldersMax}
                          onChange={(e) => setTempHoldersMax(e.target.value)}
                          step="10"
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={applyFilters}
                      className="w-full bg-[#7E34FF] hover:bg-[#6B2DD9] text-white"
                    >
                      Apply Filters
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full"
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Column Headers - Subtle (Desktop Only) */}
        <div className="hidden md:grid md:grid-cols-[60px_200px_120px_120px_140px_140px_100px_120px] gap-4 px-6 mb-3">
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Rank
          </div>
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Creator
          </div>
          <div className="text-xs uppercase tracking-wide">
            <SortButton field="tokenPrice" label="Price" />
          </div>
          <div className="text-xs uppercase tracking-wide">
            <SortButton field="change24h" label="24h" />
          </div>
          <div className="text-xs uppercase tracking-wide">
            <SortButton field="marketCap" label="Market Cap" />
          </div>
          <div className="text-xs uppercase tracking-wide">
            <SortButton field="volume24h" label="24h Volume" />
          </div>
          {/* <div className="text-xs uppercase tracking-wide">
            <SortButton field="holders" label="Holders" />
          </div> */}
          <div className="text-xs uppercase tracking-wide text-gray-500">
            Socials
          </div>
        </div>

        {/* Creator Cards/Rows */}
        <div className="space-y-3">
          {filteredCreators?.map((creator, index) => {
            const rank = startIndex + index + 1; // Dynamic rank based on position
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onCreatorClick(`creator/${creator?.slug}`);
                }}
                key={creator?.name}
                className="bg-white cursor-pointer rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="grid md:grid-cols-[60px_200px_120px_120px_140px_140px_100px_120px] gap-4 items-center">
                  {/* Rank - Desktop */}
                  <div className="hidden md:flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        rank <= 3
                          ? "bg-[#03EC86] text-gray-900"
                          : "bg-slate-200 text-gray-700"
                      }`}
                    >
                      <span className="font-semibold">{rank}</span>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    {/* Top section - Rank Badge and Creator Info */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Rank Badge - Top Left */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          rank <= 3
                            ? "bg-[#03EC86] text-gray-900"
                            : "bg-slate-200 text-gray-700"
                        }`}
                      >
                        <span className="font-semibold">{rank}</span>
                      </div>

                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0 overflow-hidden">
                          <img
                            src={creator?.avatar_url}
                            alt={creator?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <button className="font-semibold text-gray-900 hover:text-[#7E34FF] transition-colors text-left">
                            {creator?.name}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Two-column stats grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Token Price */}
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Token Price
                        </div>
                        <div className="font-semibold text-gray-900">
                          {formatSOL(creator?.key_price)}
                        </div>
                      </div>

                      {/* 24h Change */}
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          24h Change
                        </div>
                        <div
                          className={`flex items-center gap-1 font-semibold ${
                            creator?.change24h >= 0
                              ? "text-[#03EC86]"
                              : "text-red-600"
                          }`}
                        >
                          {creator?.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{creator?.change24h}%</span>
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Market Cap
                        </div>
                        <div className="font-semibold text-gray-900">
                          {formatCompactUSD(creator?.market_cap)}
                        </div>
                      </div>

                      {/* Volume */}
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          24h Volume
                        </div>
                        <div className="font-semibold text-gray-900">
                          {formatCompactUSD(creator?.volume_24h)}
                        </div>
                      </div>

                      {/* Holders - Full width */}
                      {/* <div className="col-span-2 bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500 mb-1">
                          Holders
                        </div>
                        <div className="font-semibold text-gray-900">
                          {creator?.holder_count?.toLocaleString()}
                        </div>
                      </div> */}
                    </div>

                    {/* Social Media and CTA - Vertical Layout */}
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        {creator?.twitter_url && (
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            key={creator?.twitter_url}
                            href={creator?.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                            aria-label="Twitter"
                          >
                            <XIcon className="w-6 h-6" />
                          </a>
                        )}
                        {creator?.youtube_handle && (
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            href={`https://youtube.com/@${creator?.youtube_handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                            aria-label="YouTube"
                          >
                            <Youtube className="w-6 h-6" />
                          </a>
                        )}
                        {creator?.twitch_url && (
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            href={creator?.twitch_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                            aria-label="Twitch"
                          >
                            <Twitch className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreatorClick(`creator/${creator?.slug}`);
                        }}
                        className="w-full bg-[#7E34FF] hover:bg-[#6B2DD9] text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Creator Info */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0 overflow-hidden">
                      <img
                        src={creator?.avatar_url}
                        alt={creator?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreatorClick(`creator/${creator?.slug}`);
                        }}
                        className="font-semibold text-gray-900 hover:text-[#7E34FF] transition-colors text-left"
                      >
                        {creator?.name}
                      </button>
                    </div>
                  </div>

                  {/* Desktop Token Price */}
                  <div className="hidden md:block">
                    <div className="font-semibold text-gray-900">
                      {formatSOL(creator?.key_price)}
                    </div>
                  </div>

                  {/* Desktop 24h Change */}
                  <div className="hidden md:block">
                    <div
                      className={`flex items-center gap-1 font-semibold ${
                        creator?.change24h >= 0
                          ? "text-[#03EC86]"
                          : "text-red-600"
                      }`}
                    >
                      {creator?.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{creator?.change24h || 0}%</span>
                    </div>
                  </div>

                  {/* Desktop Market Cap */}
                  <div className="hidden md:block">
                    <div className="font-semibold text-gray-900">
                      {formatCompactUSD(creator?.market_cap)}
                    </div>
                  </div>

                  {/* Desktop Volume */}
                  <div className="hidden md:block">
                    <div className="font-semibold text-gray-900">
                      {formatCompactUSD(creator?.volume_24h)}
                    </div>
                  </div>

                  {/* Desktop Holders */}
                  {/* <div className="hidden md:block">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-200">
                      <span className="font-semibold text-gray-900">
                        {creator?.holder_count?.toLocaleString()}
                      </span>
                    </div>
                  </div> */}

                  {/* Desktop Social Media */}
                  <div className="hidden md:flex items-center gap-2">
                    {creator?.twitter_url && (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={creator?.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                        aria-label="Twitter"
                      >
                        <XIcon className="w-5 h-5" />
                      </a>
                    )}
                    {creator?.youtube_handle && (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={`https://youtube.com/@${creator?.youtube_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                    {creator?.socials?.twitch && (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={creator?.socials?.twitch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-[#7E34FF]"
                        aria-label="Twitch"
                      >
                        <Twitch className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCreators?.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h3 className="text-xl mb-2 text-gray-700">No creators found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCreators?.length > itemsPerPage && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
