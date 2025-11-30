import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, Filter, ChevronDown, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: "physical" | "digital" | "access";
  isFeatured?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Limited Edition Hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    price: 5000,
    stock: 12,
    category: "physical",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Acrylic Stand",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
    price: 2500,
    stock: 28,
    category: "physical",
  },
  {
    id: 3,
    name: "Signed Poster",
    image: "https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?w=400",
    price: 8000,
    stock: 5,
    category: "physical",
  },
  {
    id: 4,
    name: "Digital Wallpaper Pack",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    price: 500,
    stock: 999,
    category: "digital",
  },
  {
    id: 5,
    name: "Exclusive Voice Pack",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400",
    price: 1500,
    stock: 999,
    category: "digital",
  },
  {
    id: 6,
    name: "VIP Discord Role (30 Days)",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
    price: 3000,
    stock: 50,
    category: "access",
  },
  {
    id: 7,
    name: "T-Shirt Bundle",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    price: 4000,
    stock: 0,
    category: "physical",
  },
];

interface OfficialStoreProps {
  onSwitchToBounty: (itemName?: string) => void;
}

export function OfficialStore({ onSwitchToBounty }: OfficialStoreProps) {
  const [filterCategory, setFilterCategory] = useState<
    "all" | "physical" | "digital" | "access"
  >("all");

  const featuredProduct = products.find((p) => p.isFeatured);
  const catalogProducts = products.filter((p) => !p.isFeatured);

  const filteredProducts = catalogProducts.filter((product) => {
    if (filterCategory === "all") return true;
    return product.category === filterCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Banner - Featured Drop */}
      {featuredProduct && (
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                ⭐ Featured Drop
              </div>
              <h2
                className="text-4xl mb-4"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {featuredProduct.name}
              </h2>
              <p className="text-white/90 mb-6">
                Exclusive limited edition merchandise. Once it's gone, it's gone
                forever!
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl">
                  <Zap className="w-5 h-5 fill-white" />
                  <span className="font-bold text-xl">
                    {featuredProduct.price.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm">
                  Only{" "}
                  <span className="font-bold text-xl">
                    {featuredProduct.stock}
                  </span>{" "}
                  left!
                </div>
              </div>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg font-bold w-fit">
                Redeem Now
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-semibold">Filter:</span>
        </div>

        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="appearance-none bg-white border-2 border-purple-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-semibold hover:border-purple-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="physical">Physical Merch</option>
            <option value="digital">Digital Goods</option>
            <option value="access">Access & Perks</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Stock Badge */}
              {product.stock === 0 ? (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SOLD OUT
                </div>
              ) : product.stock < 10 ? (
                <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                  {product.stock} LEFT
                </div>
              ) : null}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-gray-900 font-bold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                <span className="text-purple-600 font-bold text-lg">
                  {product.price.toLocaleString()}
                </span>
              </div>

              {product.stock === 0 ? (
                <button
                  onClick={() => onSwitchToBounty(product.name)}
                  className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-gray-800 transition-all font-semibold text-sm"
                >
                  Check Bounty Board →
                </button>
              ) : (
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-xl hover:scale-105 transition-all shadow-lg font-semibold">
                  Redeem
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
