import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Zap,
  Filter,
  ChevronDown,
  ShoppingBag,
  Search,
  Clock,
  Crown,
  Lock,
  Sparkles,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { RedeemModal } from "./RedeemModal";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: "physical" | "digital" | "access";
  talentName: string;
  isFeatured?: boolean;
  isPrimeOnly?: boolean;
  isTokenHolder?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

interface OfficialStoreProps {
  onProductClick?: (productId: number) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Limited Edition Hoodie",
    image: "https://images.unsplash.com/photo-1659082056845-3b839c7551bf?w=400",
    price: 5000,
    stock: 12,
    category: "physical",
    talentName: "Auremiya",
    isFeatured: true,
    isPrimeOnly: true,
    rarity: "legendary",
  },
  {
    id: 2,
    name: "Acrylic Stand",
    image: "https://images.unsplash.com/photo-1695629214193-85acaf7d4210?w=400",
    price: 2500,
    stock: 28,
    category: "physical",
    talentName: "Lunaria",
    rarity: "rare",
  },
  {
    id: 3,
    name: "Signed Poster",
    image: "https://images.unsplash.com/photo-1716184047509-041f3bd1d937?w=400",
    price: 8000,
    stock: 5,
    category: "physical",
    talentName: "Auremiya",
    isTokenHolder: true,
    rarity: "epic",
  },
  {
    id: 4,
    name: "Digital Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1761131908457-b409163623a3?w=400",
    price: 500,
    stock: 999,
    category: "digital",
    talentName: "Lunaria",
    rarity: "common",
  },
  {
    id: 5,
    name: "Exclusive Voice Pack",
    image: "https://images.unsplash.com/photo-1761131908457-b409163623a3?w=400",
    price: 1500,
    stock: 999,
    category: "digital",
    talentName: "Auremiya",
    isTokenHolder: true,
    rarity: "rare",
  },
  {
    id: 6,
    name: "VIP Discord Role (30 Days)",
    image: "https://images.unsplash.com/photo-1761131908457-b409163623a3?w=400",
    price: 3000,
    stock: 50,
    category: "access",
    talentName: "Lunaria",
    isPrimeOnly: true,
    rarity: "epic",
  },
  {
    id: 7,
    name: "T-Shirt Bundle",
    image: "https://images.unsplash.com/photo-1736892740703-92cc9088f2a7?w=400",
    price: 4000,
    stock: 0,
    category: "physical",
    talentName: "Auremiya",
    rarity: "rare",
  },
];

export function OfficialStore({ onProductClick }: OfficialStoreProps) {
  const [filterCategory, setFilterCategory] = useState<
    "all" | "physical" | "digital" | "access"
  >("all");
  const [filterTalent, setFilterTalent] = useState<"all" | string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // For demo: user is NOT prime member (set to true to unlock prime items)
  const userIsPrime = false;

  // Mock user sparks
  const userSparks = 12500;

  // Countdown timer state (ends in 24 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredProduct = products.find((p) => p.isFeatured);
  const catalogProducts = products.filter((p) => !p.isFeatured);

  const filteredProducts = catalogProducts.filter((product) => {
    // Filter by category
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    // Filter by talent
    const matchesTalent =
      filterTalent === "all" || product.talentName === filterTalent;
    // Filter by search query
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTalent && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Compact Featured Drop Banner */}
      {featuredProduct && (
        <div className="relative overflow-hidden">
          {/* Large Hero Image */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <ImageWithFallback
              src={featuredProduct.image}
              alt={featuredProduct.name}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
          </div>

          {/* Overlaid Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            {/* Top badges and timer */}
            <div className="absolute top-4 md:top-6 left-4 md:left-8 right-4 md:right-8 flex items-start justify-between gap-4">
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-xl border border-yellow-300/50 text-gray-900">
                <Sparkles className="w-4 h-4" />
                Featured Drop
              </div>

              {/* Countdown Timer - Overlapping */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold">Ends In:</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 md:px-4 md:py-3 text-center min-w-[3.5rem] shadow-xl border border-white/20">
                    <div
                      className="font-bold text-xl md:text-2xl text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/80">
                      Hours
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 md:px-4 md:py-3 text-center min-w-[3.5rem] shadow-xl border border-white/20">
                    <div
                      className="font-bold text-xl md:text-2xl text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/80">
                      Mins
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 md:px-4 md:py-3 text-center min-w-[3.5rem] shadow-xl border border-white/20">
                    <div
                      className="font-bold text-xl md:text-2xl text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/80">
                      Secs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Product Info */}
            <div className="relative z-10 max-w-4xl">
              <h2
                className="text-3xl md:text-5xl mb-3 md:mb-4 text-white drop-shadow-2xl"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {featuredProduct.name}
              </h2>
              <p className="text-white/95 text-sm md:text-base mb-4 md:mb-6 max-w-2xl drop-shadow-lg">
                Exclusive limited edition merchandise. Once it's gone, it's gone
                forever!
              </p>

              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {/* Price */}
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3 rounded-xl shadow-xl border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70">Price</div>
                    <div
                      className="font-bold text-xl md:text-2xl text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {featuredProduct.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 bg-yellow-500/90 backdrop-blur-md px-4 md:px-6 py-3 rounded-xl shadow-xl border border-yellow-400">
                  <span className="text-sm md:text-base text-gray-900">
                    Only
                  </span>
                  <span
                    className="font-bold text-2xl md:text-3xl text-gray-900"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {featuredProduct.stock}
                  </span>
                  <span className="text-sm md:text-base text-gray-900">
                    left!
                  </span>
                </div>

                {/* CTA Button */}
                <button className="bg-white text-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:scale-105 transition-all shadow-2xl font-bold text-sm md:text-base flex items-center gap-2 border-2 border-white/50">
                  <ShoppingBag className="w-5 h-5" />
                  Redeem Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search Bar - Left */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchandise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-purple-200 rounded-xl pl-12 pr-4 py-2.5 text-gray-700 placeholder-gray-400 hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
        </div>

        {/* Filter - Right */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-semibold">Filter:</span>
          </div>

          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="appearance-none bg-white border-2 border-purple-200 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-semibold hover:border-purple-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="physical">Physical Merch</option>
              <option value="digital">Digital Goods</option>
              <option value="access">Access & Perks</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filterTalent}
              onChange={(e) => setFilterTalent(e.target.value as any)}
              className="appearance-none bg-white border-2 border-purple-200 rounded-xl px-4 py-2.5 pr-10 text-gray-700 font-semibold hover:border-purple-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Talents</option>
              <option value="Auremiya">Auremiya</option>
              <option value="Lunaria">Lunaria</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          // Check if product is locked (requires prime/token but user doesn't have it)
          const isLocked =
            (product.isPrimeOnly || product.isTokenHolder) && !userIsPrime;
          const isPrimeUnlocked =
            (product.isPrimeOnly || product.isTokenHolder) && userIsPrime;
          const isSoldOut = product.stock === 0;

          // Rarity color mapping
          const rarityColors = {
            common: "from-gray-400 to-gray-300",
            rare: "from-blue-500 to-blue-400",
            epic: "from-purple-600 to-purple-500",
            legendary: "from-yellow-500 to-yellow-400",
          };

          const rarityGlow = {
            common: "rgba(156, 163, 175, 0.2)",
            rare: "rgba(59, 130, 246, 0.3)",
            epic: "rgba(147, 51, 234, 0.4)",
            legendary: "rgba(234, 179, 8, 0.5)",
          };

          return (
            <div
              key={product.id}
              className="group relative cursor-pointer"
              onClick={() =>
                !isSoldOut && !isLocked && onProductClick?.(product.id)
              }
            >
              {/* Ornate corners - Genshin style */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-purple-400/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-400/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-purple-400/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-400/40 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              {/* Rarity glow effect */}
              <div
                className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${
                    rarityGlow[product.rarity || "common"]
                  }, transparent)`,
                }}
              ></div>

              {/* Card - Different border for prime unlocked, grey for sold out */}
              <div
                className={`relative bg-white border-2 rounded-2xl overflow-hidden transition-all shadow-lg group-hover:shadow-2xl ${
                  isSoldOut
                    ? "border-gray-300 opacity-60 grayscale"
                    : isPrimeUnlocked
                    ? "border-yellow-400 group-hover:border-yellow-500"
                    : "border-purple-200 group-hover:border-purple-400"
                }`}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                  {/* Rarity gradient overlay on image */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      rarityColors[product.rarity || "common"]
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10`}
                  ></div>

                  {/* Image with blur if locked */}
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      isLocked ? "blur-sm" : ""
                    }`}
                  />

                  {/* Locked overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10"></div>
                  )}

                  {/* Prime Badge - Top Left with dramatic styling */}
                  {(product.isPrimeOnly || product.isTokenHolder) && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 shadow-lg border border-yellow-300/50 z-20">
                      <Crown className="w-3.5 h-3.5" />
                      <span>PRIME</span>
                      <Sparkles className="w-3 h-3 animate-pulse" />
                    </div>
                  )}

                  {/* Stock Badge - Top Right */}
                  {isSoldOut ? (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm z-20">
                      SOLD OUT
                    </div>
                  ) : product.stock < 10 ? (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm border border-yellow-400 z-20">
                      {product.stock} LEFT
                    </div>
                  ) : null}
                </div>

                {/* Product Info */}
                <div className="p-5 relative">
                  {/* Subtle top border ornament */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

                  {/* Talent badge - NO STAR ICON */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-pink-100 px-2.5 py-1 rounded-lg">
                      <span className="text-xs font-bold text-purple-700">
                        {product.talentName}
                      </span>
                    </div>

                    {/* Category mini badge */}
                    <div
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        product.category === "physical"
                          ? "bg-purple-100 text-purple-700"
                          : product.category === "digital"
                          ? "bg-green-100 text-green-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {product.category === "physical"
                        ? "PHYSICAL"
                        : product.category === "digital"
                        ? "DIGITAL"
                        : "ACCESS"}
                    </div>
                  </div>

                  <h3
                    className="text-gray-900 font-bold mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {product.name}
                  </h3>

                  {/* Price with dramatic styling */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Sparks</div>
                      <div
                        className="text-purple-600 font-bold text-lg leading-none"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        {product.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Stock Available */}
                  {!isSoldOut && product.stock >= 10 && (
                    <div className="text-xs text-green-600 font-semibold mb-4">
                      {product.stock} Available
                    </div>
                  )}

                  {/* Spacing for items without stock text */}
                  {(isSoldOut || product.stock < 10) && (
                    <div className="mb-4"></div>
                  )}

                  {/* Button - different for locked/sold out items */}
                  {isSoldOut ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl cursor-not-allowed font-bold text-sm border-2 border-gray-400"
                    >
                      Out of Stock
                    </button>
                  ) : isLocked ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-gray-700 py-3 rounded-xl cursor-not-allowed font-bold relative overflow-hidden border-2 border-gray-500"
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        PRIME ONLY
                      </span>
                    </button>
                  ) : (
                    <button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all shadow-lg font-bold relative overflow-hidden group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Redeem Now
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redeem Modal */}
      {selectedProduct && (
        <RedeemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          userSparks={userSparks}
        />
      )}
    </div>
  );
}
