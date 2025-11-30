import { useState } from "react";
import { Zap, Coins } from "lucide-react";
import { OfficialStore, BountyBoard } from "../components";

export function MarketPage() {
  const [activeTab, setActiveTab] = useState<"store" | "bounty">("store");
  const [bountyFilter, setBountyFilter] = useState<string | undefined>(
    undefined
  );

  const handleSwitchToBounty = (itemName?: string) => {
    setActiveTab("bounty");
    setBountyFilter(itemName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-2 inline-flex gap-2 shadow-lg">
            <button
              onClick={() => setActiveTab("store")}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${
                activeTab === "store"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap
                  className={`w-5 h-5 ${
                    activeTab === "store" ? "fill-white" : ""
                  }`}
                />
                <div>
                  <div className="text-sm">Official Store</div>
                  <div className="text-xs opacity-80">
                    Spend Sparks, Get Merch
                  </div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("bounty")}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${
                activeTab === "bounty"
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Coins
                  className={`w-5 h-5 ${
                    activeTab === "bounty" ? "text-yellow-400" : ""
                  }`}
                />
                <div>
                  <div className="text-sm">Bounty Board</div>
                  <div className="text-xs opacity-80">
                    Fulfill Requests, Earn Tokens
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === "store" ? (
            <OfficialStore onSwitchToBounty={handleSwitchToBounty} />
          ) : (
            <BountyBoard initialFilter={bountyFilter} />
          )}
        </div>
      </div>
    </div>
  );
}
