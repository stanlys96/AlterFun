import { useState } from "react";
import {
  Zap,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Crown,
  Settings,
  MapPin,
  Gem,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  status: "unclaimed" | "shipped" | "listed";
  talent: string;
}

interface Activity {
  id: string;
  type: "earn" | "spend" | "sell";
  action: string;
  amount: number;
  currency: "sparks" | "creator";
  date: string;
}

interface TalentToken {
  talent: string;
  ticker: string;
  amount: number;
  avatar: string;
}

export function DashboardPage() {
  const [filter, setFilter] = useState<
    "all" | "unclaimed" | "shipped" | "listed"
  >("all");

  // Mock user data
  const userData = {
    name: "Sarah Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isPrime: true,
    level: 12,
    levelProgress: 65, // percentage
    sparks: 12500,
    creatorTokens: 500.0,
  };

  // Mock talent tokens
  const talentTokens: TalentToken[] = [
    {
      talent: "Auremiya",
      ticker: "$YAMI",
      amount: 350.0,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    {
      talent: "Lunaria",
      ticker: "$LUNA",
      amount: 150.0,
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100",
    },
  ];

  // Mock inventory
  const inventory: InventoryItem[] = [
    {
      id: "1",
      name: "YAMI Hoodie (Limited)",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      status: "unclaimed",
      talent: "YAMI",
    },
    {
      id: "2",
      name: "Signed Poster",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
      status: "listed",
      talent: "YAMI",
    },
    {
      id: "3",
      name: "Acrylic Stand",
      image:
        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400",
      status: "shipped",
      talent: "YAMI",
    },
    {
      id: "4",
      name: "Digital Wallpaper Set",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400",
      status: "unclaimed",
      talent: "YAMI",
    },
  ];

  // Mock activity history
  const activities: Activity[] = [
    {
      id: "1",
      type: "earn",
      action: "Mission Completed: Watch Stream",
      amount: 100,
      currency: "sparks",
      date: "2024-11-25",
    },
    {
      id: "2",
      type: "spend",
      action: "Redeemed: YAMI Hoodie",
      amount: 5000,
      currency: "sparks",
      date: "2024-11-24",
    },
    {
      id: "3",
      type: "sell",
      action: "Bounty Sold: Signed Poster",
      amount: 500,
      currency: "creator",
      date: "2024-11-23",
    },
    {
      id: "4",
      type: "earn",
      action: "Mission Completed: Daily Check-in",
      amount: 50,
      currency: "sparks",
      date: "2024-11-23",
    },
    {
      id: "5",
      type: "earn",
      action: "Staking Reward",
      amount: 30,
      currency: "creator",
      date: "2024-11-22",
    },
  ];

  const filteredInventory = inventory.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <ImageWithFallback
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 rounded-full border-4 border-purple-200"
              />
              {userData.isPrime && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Crown className="w-5 h-5 text-gray-900" />
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData.name}
                </h1>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Badge Status */}
              {userData.isPrime ? (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold mb-4">
                  <Crown className="w-4 h-4" />
                  <span>Prime Member</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-bold mb-4">
                  <span>Explorer</span>
                </div>
              )}

              {/* Level Bar */}
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-semibold">
                    Level {userData.level}
                  </span>
                  <span className="text-sm text-gray-600">
                    {userData.levelProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                    style={{ width: `${userData.levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Sweat Wallet */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <div className="text-gray-600 text-sm">AlterSparks</div>
                <div className="text-3xl font-bold text-gray-900">
                  ⚡ {userData.sparks.toLocaleString()}
                </div>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
              Earn More
            </button>
          </div>

          {/* Creator Holdings */}
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-2 border-yellow-500/50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Gem className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <div className="text-white/70 text-sm">Creator Holdings</div>
                <div className="text-lg text-white/90 font-semibold">
                  {talentTokens.length}{" "}
                  {talentTokens.length === 1 ? "Creator" : "Creators"}
                </div>
              </div>
            </div>

            {/* Talent Tokens List */}
            <div className="space-y-3 mb-4">
              {talentTokens.map((token, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={token.avatar}
                        alt={token.talent}
                        className="w-10 h-10 rounded-full border-2 border-yellow-400"
                      />
                      <div className="text-white font-bold">{token.talent}</div>
                    </div>
                    <div className="text-white font-bold flex items-center gap-2">
                      <Gem className="w-5 h-5 text-yellow-400" />
                      <span>
                        {token.amount.toFixed(2)} {token.ticker}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-yellow-500 text-gray-900 py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
                Trade
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-xl hover:bg-white/20 transition-all font-bold">
                Manage Prime
              </button>
            </div>
          </div>
        </div>

        {/* My Collection */}
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              My Collection
            </h2>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unclaimed")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "unclaimed"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Digital
              </button>
              <button
                onClick={() => setFilter("shipped")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "shipped"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Physical
              </button>
              <button
                onClick={() => setFilter("listed")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === "listed"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Listed
              </button>
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredInventory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-400 transition-all group"
              >
                {/* Item Image */}
                <div className="relative aspect-square overflow-hidden bg-white">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {item.status === "unclaimed" && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        UNCLAIMED
                      </div>
                    )}
                    {item.status === "shipped" && (
                      <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        SHIPPED
                      </div>
                    )}
                    {item.status === "listed" && (
                      <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        ON BOUNTY
                      </div>
                    )}
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="text-xs text-gray-600 mb-1">
                    {item.talent}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4">{item.name}</h3>

                  {/* Action Buttons */}
                  {item.status === "unclaimed" && (
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:scale-105 transition-all font-bold text-sm flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Ship to Me</span>
                      </button>
                      <button className="w-full bg-gray-900 text-yellow-400 py-2 rounded-lg hover:bg-gray-800 transition-all font-bold text-sm">
                        Sell on Bounty
                      </button>
                    </div>
                  )}
                  {item.status === "shipped" && (
                    <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all font-bold text-sm flex items-center justify-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  )}
                  {item.status === "listed" && (
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all font-bold text-sm">
                      Cancel Listing
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No items found in this category
              </p>
            </div>
          )}
        </div>

        {/* Activity History */}
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Activity History
          </h2>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "earn"
                        ? "bg-green-100"
                        : activity.type === "spend"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {activity.type === "earn" ? (
                      <TrendingUp
                        className={`w-5 h-5 ${
                          activity.type === "earn" ? "text-green-600" : ""
                        }`}
                      />
                    ) : activity.type === "spend" ? (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {activity.action}
                    </div>
                    <div className="text-sm text-gray-600">{activity.date}</div>
                  </div>
                </div>

                {/* Amount */}
                <div
                  className={`font-bold text-lg ${
                    activity.type === "earn"
                      ? "text-green-600"
                      : activity.type === "spend"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {activity.type === "earn" ? "+" : "-"}
                  {activity.amount.toLocaleString()}{" "}
                  {activity.currency === "sparks" ? "⚡" : "💎"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
