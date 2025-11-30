import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Crown, Plus, Filter, ChevronDown, Gem } from "lucide-react";
import { useState } from "react";
import { TokenSelector, TokenOption } from "./TokenSelector";
import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { timeAgo } from "../utils/utils";

interface BountyBoardProps {
  initialFilter?: string;
  isHomepage?: boolean;
}

export function BountyBoard({
  initialFilter,
  isHomepage = false,
}: BountyBoardProps) {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "my-bounties"
  >("active");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState("yami");
  const [offerAmount, setOfferAmount] = useState(5000);

  const fetcher = async (key: string) => {
    const { data, error } = await supabase
      .from(key)
      .select(
        "*, users!bounties_user_id_fkey(*), official_products(*, creators(*))"
      );
    if (error) throw error;
    return data;
  };
  const { data: bountiesData } = useSWR("bounties", fetcher);
  console.log(bountiesData, "<<");
  // Available tokens
  const availableTokens: TokenOption[] = [
    {
      id: "yami",
      name: "Auremiya",
      ticker: "$YAMI",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      balance: 5420,
      color: "#9333ea",
    },
    {
      id: "luna",
      name: "Lunaria",
      ticker: "$LUNA",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      balance: 3180,
      color: "#ec4899",
    },
    {
      id: "kai",
      name: "Kaito",
      ticker: "$KAI",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      balance: 8750,
      color: "#3b82f6",
    },
    {
      id: "sakura",
      name: "Sakura Hime",
      ticker: "$SAKURA",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      balance: 2100,
      color: "#f472b6",
    },
    {
      id: "ryu",
      name: "Ryusei",
      ticker: "$RYU",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      balance: 6340,
      color: "#ef4444",
    },
    {
      id: "miko",
      name: "Mikochi",
      ticker: "$MIKO",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      balance: 4890,
      color: "#a855f7",
    },
    {
      id: "hoshi",
      name: "Hoshimiya",
      ticker: "$HOSHI",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
      balance: 7200,
      color: "#06b6d4",
    },
    {
      id: "yuki",
      name: "Yukihana",
      ticker: "$YUKI",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
      balance: 1560,
      color: "#8b5cf6",
    },
    {
      id: "kuro",
      name: "Kuroshiro",
      ticker: "$KURO",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      balance: 9100,
      color: "#000000",
    },
    {
      id: "nami",
      name: "Nami-chan",
      ticker: "$NAMI",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
      balance: 3670,
      color: "#10b981",
    },
  ];

  const selectedToken =
    availableTokens.find((t) => t.id === selectedTokenId) || availableTokens[0];

  const filteredRequests = bountiesData?.filter((request) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return request?.status === "active";
    if (filterStatus === "my-bounties") return false; // Mock: user has no bounties
    return true;
  });

  // For homepage, show only top 3
  const displayRequests = isHomepage
    ? filteredRequests?.slice(0, 3)
    : filteredRequests;

  // Homepage variant - Card Grid
  if (isHomepage) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Bounty Board
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto">
              Can't find sold-out merch? Request it here and other fans can
              fulfill your request.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {displayRequests?.map((request) => (
              <div
                key={request?.id}
                className="bg-white border-2 border-yellow-500/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-yellow-500 transition-all group"
              >
                {/* Item Image */}
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <ImageWithFallback
                    src={request?.official_products?.image}
                    alt={request?.official_products?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {request?.official_products?.creators?.name}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {request?.official_products?.name}
                  </h3>

                  {/* Requester */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-200">
                      <ImageWithFallback
                        src={request?.users?.avatar_url}
                        alt={request?.users?.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      by {request?.users?.username}
                    </span>
                  </div>

                  {/* Offer Price */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 px-4 py-3 rounded-xl text-center mb-4">
                    <div className="flex items-center justify-center gap-2 text-gray-900 font-bold">
                      <Gem className="w-5 h-5 text-yellow-600" />
                      <span>{request?.bounty?.toLocaleString()}</span>
                      <span>${request?.token}</span>
                    </div>
                  </div>

                  {/* Posted Time */}
                  <div className="text-xs text-gray-500 text-center mb-4">
                    Posted {timeAgo(request?.created_at)}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
                    Fulfill Request
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg font-bold text-lg">
              View All Requests
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Market page variant - Card Grid (like Official Store)
  return (
    <div className="space-y-6">
      {/* Header with Filters and Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-semibold">Show:</span>
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="appearance-none bg-white border-2 border-yellow-500/30 rounded-xl px-4 py-2 pr-10 text-gray-700 font-semibold hover:border-yellow-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="active">Active Requests</option>
              <option value="all">All Requests</option>
              <option value="my-bounties">My Bounties</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 bg-green-100 border border-green-300 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-800">
              {filteredRequests?.length} Live Demand
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold"
        >
          <Plus className="w-5 h-5" />
          Create Request
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Crown className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              How Bounty Board Works
            </h3>
            <p className="text-sm text-gray-700">
              Can't find sold-out merch in the Official Store? Request it here!
              Other fans who own the item can fulfill your request and earn
              creator tokens. Premium members can create requests.
            </p>
          </div>
        </div>
      </div>

      {/* Bounty Card Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRequests?.map((request) => (
          <div
            key={request.id}
            className="bg-white border-2 border-yellow-500/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-yellow-500 transition-all group"
          >
            {/* Item Image */}
            <div className="aspect-square overflow-hidden bg-gray-100 relative">
              <ImageWithFallback
                src={request?.official_products?.image}
                alt={request?.official_products?.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {request?.users?.username}
              </div>
              {request?.fulfilled && (
                <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✓ Fulfilled
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                {request?.official_products?.name}
              </h3>

              {/* Requester */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-200">
                  <ImageWithFallback
                    src={request?.users?.avatar_url}
                    alt={request?.users?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500">Requested by</div>
                  <div className="text-sm text-gray-700 font-semibold truncate">
                    {request?.users?.username}
                  </div>
                </div>
              </div>

              {/* Offer Price */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 px-4 py-3 rounded-xl mb-3">
                <div className="text-xs text-gray-600 mb-1 text-center">
                  Offering
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-900 font-bold">
                  <Gem className="w-5 h-5 text-yellow-600" />
                  <span>{request?.bounty?.toLocaleString()}</span>
                  <span>${request?.token}</span>
                </div>
              </div>

              {/* Posted Time */}
              <div className="text-xs text-gray-500 text-center mb-4">
                Posted {timeAgo(request?.created_at)}
              </div>

              {/* Action Button */}
              {!request?.fulfilled ? (
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
                  Fulfill Request
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  Closed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for My Bounties */}
      {filterStatus === "my-bounties" && filteredRequests?.length === 0 && (
        <div className="text-center py-12">
          <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Active Bounties
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't created any bounty requests yet.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold"
          >
            <Plus className="w-5 h-5" />
            Create Your First Request
          </button>
        </div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Create Bounty Request
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Can't find sold-out merch? Create a request and let other fans
              fulfill it.
            </p>

            <div className="space-y-5">
              {/* Item Name */}
              <div>
                <label className="text-gray-900 font-bold mb-2 block">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Limited Edition Hoodie"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Item Description */}
              <div>
                <label className="text-gray-900 font-bold mb-2 block">
                  Description
                </label>
                <textarea
                  placeholder="Describe the item you're looking for..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              {/* Token Selector */}
              <TokenSelector
                tokens={availableTokens}
                selectedToken={selectedTokenId}
                onSelectToken={setSelectedTokenId}
                label="Payment Token:"
                showBalance={true}
              />

              {/* Offer Amount */}
              <div>
                <label className="text-gray-900 font-bold mb-2 block">
                  Your Offer
                </label>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(Number(e.target.value))}
                    className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer mb-3"
                  />
                  <div className="flex items-center justify-center gap-2 text-gray-900">
                    <Gem className="w-6 h-6 text-yellow-600" />
                    <span className="text-2xl font-bold">
                      {offerAmount.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold">
                      {selectedToken.ticker}
                    </span>
                  </div>
                  <div className="text-center text-xs text-gray-600 mt-2">
                    Balance: {selectedToken.balance.toLocaleString()}{" "}
                    {selectedToken.ticker}
                  </div>
                </div>
              </div>

              {/* Prime Notice */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <Crown className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <span className="font-bold text-purple-600">
                      Prime Members Only:
                    </span>{" "}
                    This feature requires an active Prime membership to create
                    bounty requests.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
