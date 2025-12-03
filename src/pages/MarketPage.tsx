import { useState } from "react";
import { ShoppingBag, Package, Sparkles } from "lucide-react";
import { OfficialStore } from "../components/OfficialStore";
import { BlindBoxStore } from "../components/BlindBoxStore";

interface MarketPageProps {
  onProductClick?: (productId: number) => void;
}

export function MarketPage({ onProductClick }: MarketPageProps) {
  const [activeTab, setActiveTab] = useState<"store" | "blindbox">("store");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 pt-24 pb-16">
      {/* Floating Sidebar Navigation - Sticky to Left Edge */}
      <div className="hidden lg:block fixed left-0 top-28 z-40">
        <div className="bg-white/80 backdrop-blur-md border-r-2 border-purple-200 shadow-xl">
          {/* Navigation Items */}
          <div className="flex flex-col">
            <button
              onClick={() => setActiveTab("store")}
              className={`px-6 py-6 font-bold transition-all border-b border-purple-200/50 ${
                activeTab === "store"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeTab === "store" ? "bg-white/20" : "bg-purple-100"
                  }`}
                >
                  <ShoppingBag
                    className={`w-6 h-6 ${
                      activeTab === "store" ? "text-white" : "text-purple-600"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm">Official Store</div>
                  <div
                    className={`text-xs ${
                      activeTab === "store" ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    Spend Sparks
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("blindbox")}
              className={`px-6 py-6 font-bold transition-all ${
                activeTab === "blindbox"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeTab === "blindbox" ? "bg-white/20" : "bg-purple-100"
                  }`}
                >
                  <Package
                    className={`w-6 h-6 ${
                      activeTab === "blindbox"
                        ? "text-white"
                        : "text-purple-600"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm">Blind Box</div>
                  <div
                    className={`text-xs ${
                      activeTab === "blindbox"
                        ? "text-white/80"
                        : "text-gray-500"
                    }`}
                  >
                    Collect Cards
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-56">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-8 w-full">
          <div className="bg-white border-2 border-purple-200 rounded-2xl p-1.5 md:p-2 flex gap-1.5 md:gap-2 shadow-lg w-full">
            <button
              onClick={() => setActiveTab("store")}
              className={`flex-1 px-3 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all ${
                activeTab === "store"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 md:gap-2">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Official Store</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("blindbox")}
              className={`flex-1 px-3 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all ${
                activeTab === "blindbox"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 md:gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">Blind Box</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[600px]">
          {activeTab === "store" ? (
            <OfficialStore onProductClick={onProductClick} />
          ) : (
            <BlindBoxStore />
          )}
        </div>
      </div>
    </div>
  );
}
