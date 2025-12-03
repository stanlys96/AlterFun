import { useState } from "react";
import { Zap, Package, Sparkles, Star, Crown, Flame, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type CardRarity = "common" | "rare" | "epic" | "legendary";

interface Card {
  id: string;
  name: string;
  talent: string;
  rarity: CardRarity;
  image: string;
  season: string;
}

const PACK_PRICE = 500;
const BURN_RETURN = 50;

// Mock card pool
const CARD_POOL: Omit<Card, "id">[] = [
  // Common cards (50%)
  {
    name: "Starlight Smile",
    talent: "YAMI",
    rarity: "common",
    image: "vtuber avatar",
    season: "Season 1: The Awakening",
  },
  {
    name: "Morning Stream",
    talent: "LUNA",
    rarity: "common",
    image: "vtuber gaming",
    season: "Season 1: The Awakening",
  },
  {
    name: "Casual Chat",
    talent: "KAI",
    rarity: "common",
    image: "anime character",
    season: "Season 1: The Awakening",
  },
  {
    name: "Practice Session",
    talent: "RIKU",
    rarity: "common",
    image: "vtuber streaming",
    season: "Season 1: The Awakening",
  },
  {
    name: "Debut Day",
    talent: "MIRA",
    rarity: "common",
    image: "anime girl",
    season: "Season 1: The Awakening",
  },

  // Rare cards (35%)
  {
    name: "Silver Celebration",
    talent: "YAMI",
    rarity: "rare",
    image: "anime celebration",
    season: "Season 1: The Awakening",
  },
  {
    name: "Moonlit Performance",
    talent: "LUNA",
    rarity: "rare",
    image: "vtuber concert",
    season: "Season 1: The Awakening",
  },
  {
    name: "Victory Pose",
    talent: "KAI",
    rarity: "rare",
    image: "anime victory",
    season: "Season 1: The Awakening",
  },
  {
    name: "Duet Special",
    talent: "RIKU",
    rarity: "rare",
    image: "vtuber music",
    season: "Season 1: The Awakening",
  },

  // Epic cards (14%)
  {
    name: "Costume Reveal",
    talent: "YAMI",
    rarity: "epic",
    image: "anime fashion",
    season: "Season 1: The Awakening",
  },
  {
    name: "Lunar Eclipse",
    talent: "LUNA",
    rarity: "epic",
    image: "fantasy character",
    season: "Season 1: The Awakening",
  },
  {
    name: "Battle Form",
    talent: "KAI",
    rarity: "epic",
    image: "anime warrior",
    season: "Season 1: The Awakening",
  },

  // Legendary cards (1%)
  {
    name: "Divine Awakening",
    talent: "YAMI",
    rarity: "legendary",
    image: "fantasy goddess",
    season: "Season 1: The Awakening",
  },
  {
    name: "Celestial Dream",
    talent: "LUNA",
    rarity: "legendary",
    image: "magical girl",
    season: "Season 1: The Awakening",
  },
];

const RARITY_CONFIG = {
  common: {
    label: "Common",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
    glowColor: "from-gray-400 to-gray-600",
    chance: 0.5,
  },
  rare: {
    label: "Rare",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
    glowColor: "from-blue-400 to-purple-600",
    chance: 0.35,
  },
  epic: {
    label: "Epic",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-500",
    glowColor: "from-purple-500 to-pink-600",
    chance: 0.14,
  },
  legendary: {
    label: "Legendary",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    glowColor: "from-yellow-400 to-orange-600",
    chance: 0.01,
  },
};

function pullCard(): Card {
  const rand = Math.random();
  let cumulativeChance = 0;
  let selectedRarity: CardRarity = "common";

  for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
    cumulativeChance += config.chance;
    if (rand <= cumulativeChance) {
      selectedRarity = rarity as CardRarity;
      break;
    }
  }

  const cardsOfRarity = CARD_POOL.filter((c) => c.rarity === selectedRarity);
  const randomCard =
    cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];

  return {
    ...randomCard,
    id: `card-${Date.now()}-${Math.random()}`,
  };
}

export function BlindBoxStore() {
  const [userSparks, setUserSparks] = useState(12500);
  const [isOpening, setIsOpening] = useState(false);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);
  const [collection, setCollection] = useState<Card[]>([]);
  const [showCollection, setShowCollection] = useState(false);

  const handleBuyPack = () => {
    if (userSparks < PACK_PRICE) {
      alert("Not enough Sparks!");
      return;
    }

    setUserSparks((prev) => prev - PACK_PRICE);
    setIsOpening(true);

    // Simulate pack opening animation
    setTimeout(() => {
      const card = pullCard();
      setRevealedCard(card);
      setIsOpening(false);
    }, 2000);
  };

  const handleKeepCard = () => {
    if (revealedCard) {
      setCollection((prev) => [...prev, revealedCard]);
      setRevealedCard(null);
    }
  };

  const handleBurnCard = () => {
    if (revealedCard) {
      setUserSparks((prev) => prev + BURN_RETURN);
      setRevealedCard(null);
    }
  };

  return (
    <div className="relative">
      {/* Anime-style background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative">
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-purple-400/30 rounded-tl-2xl"></div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-pink-400/30 rounded-br-2xl"></div>

            <h1
              className="text-gray-900 mb-2 px-4"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                textShadow: "2px 2px 0 rgba(168, 85, 247, 0.1)",
              }}
            >
              Gacha Summon
            </h1>
            <p className="text-gray-700 px-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Pull exclusive digital cards •
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Gen 1: The Awakening
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            {/* Sparks Display - Anime style */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white border-2 border-purple-300 px-4 md:px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Sparks</div>
                    <div
                      className="font-bold text-purple-900 leading-none"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {userSparks.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collection Button - Anime style */}
            <button
              onClick={() => setShowCollection(!showCollection)}
              className="relative group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span className="hidden sm:inline">Collection</span> (
                {collection.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Rarity Info - Genshin style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {Object.entries(RARITY_CONFIG).map(([rarity, config]) => (
          <div key={rarity} className="group relative">
            {/* Glow effect */}
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${config.glowColor} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity`}
            ></div>

            {/* Card */}
            <div
              className={`relative ${config.bgColor} border-2 ${config.borderColor} rounded-2xl p-4 text-center transition-all group-hover:scale-105`}
            >
              <div className="flex items-center justify-center gap-1 mb-2">
                {rarity === "legendary" && (
                  <Crown className={`w-4 h-4 ${config.color}`} />
                )}
                {rarity === "epic" && (
                  <Star className={`w-4 h-4 ${config.color}`} />
                )}
                {rarity === "rare" && (
                  <Sparkles className={`w-4 h-4 ${config.color}`} />
                )}
                <div
                  className={`font-bold ${config.color} text-sm md:text-base`}
                >
                  {config.label}
                </div>
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold">
                {(config.chance * 100).toFixed(rarity === "legendary" ? 1 : 0)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collection View */}
      {showCollection ? (
        <div className="relative bg-white rounded-3xl p-6 md:p-8 border-2 border-purple-200 shadow-xl">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-2xl"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-2xl"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-2xl"></div>

          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-gray-900 flex items-center gap-3"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
              }}
            >
              <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 fill-yellow-500" />
              Your Collection
            </h3>
            <button
              onClick={() => setShowCollection(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {collection.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl"></div>
                <Package className="relative w-16 h-16 mx-auto opacity-30" />
              </div>
              <p className="font-semibold mb-2">No cards collected yet!</p>
              <p className="text-sm">
                Start your journey by opening your first pack
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {collection.map((card) => (
                <CardDisplay key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Pack Purchase Area */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Pack Visual */}
              <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 rounded-3xl p-12 text-center shadow-2xl border-4 border-purple-400">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm border-4 border-white/30 mb-6 relative">
                    <Package className="w-16 h-16 text-white" />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm">
                      NEW
                    </div>
                  </div>
                  <h2
                    className="text-white mb-3"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "2.5rem",
                    }}
                  >
                    AlterFUN Card Pack
                  </h2>
                  <p className="text-white/90 text-lg mb-2">
                    Gen 1: The Awakening
                  </p>
                  <p className="text-white/80">
                    Contains 1 Random Digital Card
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: "2.5rem" }}
                    >
                      {PACK_PRICE}
                    </span>
                    <span className="text-white/80 text-xl">Sparks</span>
                  </div>
                  <p className="text-white/70 text-sm">per pack</p>
                </div>

                <button
                  onClick={handleBuyPack}
                  disabled={userSparks < PACK_PRICE || isOpening}
                  className="w-full bg-white text-purple-900 px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl"
                >
                  {isOpening ? "Opening..." : "Buy 1 Pack"}
                </button>

                {userSparks < PACK_PRICE && (
                  <p className="text-red-300 mt-4 font-bold">
                    Not enough Sparks!
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Opening Animation Modal */}
      {isOpening && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block animate-bounce">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <Package className="w-24 h-24 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 to-pink-400 blur-2xl opacity-50 animate-pulse"></div>
            </div>
            <p className="text-white mt-8 text-2xl font-bold animate-pulse">
              Opening Pack...
            </p>
          </div>
        </div>
      )}

      {/* Card Reveal Modal */}
      {revealedCard && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8 animate-fade-in">
              <div
                className={`inline-block ${
                  RARITY_CONFIG[revealedCard.rarity].bgColor
                } px-6 py-3 rounded-full mb-4 border-2 ${
                  RARITY_CONFIG[revealedCard.rarity].borderColor
                }`}
              >
                <span
                  className={`font-bold text-xl ${
                    RARITY_CONFIG[revealedCard.rarity].color
                  }`}
                >
                  {RARITY_CONFIG[revealedCard.rarity].label}
                </span>
              </div>
            </div>

            <div className="animate-scale-in">
              <CardDisplay card={revealedCard} size="large" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleBurnCard}
                className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" />
                Burn (+{BURN_RETURN}{" "}
                <Zap className="w-4 h-4 fill-white inline" />)
              </button>
              <button
                onClick={handleKeepCard}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Keep Card
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8) rotateY(90deg); }
          to { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

interface CardDisplayProps {
  card: Card;
  size?: "normal" | "large";
}

function CardDisplay({ card, size = "normal" }: CardDisplayProps) {
  const config = RARITY_CONFIG[card.rarity];
  const isLarge = size === "large";

  return (
    <div className={`relative group ${isLarge ? "w-full" : ""}`}>
      <div
        className={`relative rounded-2xl overflow-hidden border-4 ${config.borderColor} shadow-2xl bg-gradient-to-br ${config.glowColor} p-1`}
      >
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Card Image */}
          <div
            className={`relative ${
              isLarge ? "h-96" : "h-48"
            } bg-gradient-to-br from-purple-900 to-pink-900`}
          >
            <ImageWithFallback
              src=""
              alt={card.name}
              className="w-full h-full object-cover opacity-80"
              query={card.image}
            />
            {card.rarity === "legendary" && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-purple-400/20 animate-pulse"></div>
            )}
          </div>

          {/* Card Info */}
          <div
            className={`p-4 bg-gradient-to-br from-gray-800 to-gray-900 ${
              isLarge ? "space-y-3" : "space-y-2"
            }`}
          >
            <div
              className={`${config.color} ${
                isLarge ? "text-sm" : "text-xs"
              } font-bold flex items-center gap-1`}
            >
              {card.rarity === "legendary" && (
                <Crown className={`${isLarge ? "w-4 h-4" : "w-3 h-3"}`} />
              )}
              {card.rarity === "epic" && (
                <Star className={`${isLarge ? "w-4 h-4" : "w-3 h-3"}`} />
              )}
              {config.label}
            </div>
            <h4
              className={`text-white font-bold ${
                isLarge ? "text-xl" : "text-sm"
              }`}
            >
              {card.name}
            </h4>
            <p className={`text-gray-400 ${isLarge ? "text-sm" : "text-xs"}`}>
              {card.talent}
            </p>
            <p
              className={`text-gray-500 ${isLarge ? "text-xs" : "text-[10px]"}`}
            >
              {card.season}
            </p>
          </div>
        </div>
      </div>

      {/* Legendary Glow Effect */}
      {card.rarity === "legendary" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 blur-xl opacity-50 animate-pulse -z-10"></div>
      )}
    </div>
  );
}
