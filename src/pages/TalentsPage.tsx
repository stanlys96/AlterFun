import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Circle, Users, Eye, Sparkles, Gem, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const bgImage = "figma:asset/a14145039eddd924a8ebfed84c9d736301a46bf3.png";
const characterPng = "figma:asset/e2961a5ee7ad796226b86872eacd42a019078cb2.png";
const lunariaCharacter =
  "figma:asset/543460e5a2758acf4ce78d7963e812ce48bc173c.png";
const talentBgImage =
  "figma:asset/cd60e6014c8b66eafd8b10b319cf68c912166dd5.png";
const lunariaBgImage =
  "figma:asset/bcbb1c58bdaa295ef21dd185485d15daab8a1e32.png";

interface Talent {
  id: number;
  name: string;
  image: string;
  bgImage: string;
  isLive: boolean;
  chapter: string;
  generation: string;
  element: string;
  subscribers: string;
  views: string;
  rarity: number;
  token: string;
  tokenAmount: string;
  themeColor: string;
  slug: string;
}

const talents: Talent[] = [
  {
    id: 2,
    name: "Auremiya",
    image: characterPng,
    bgImage: talentBgImage,
    isLive: true,
    chapter: "Chapter 2: Nexus",
    generation: "Gen 1",
    element: "Shadow",
    subscribers: "13.1K",
    views: "835K",
    rarity: 5,
    token: "$YAMI",
    tokenAmount: "12,450",
    themeColor: "from-pink-600 via-pink-500 to-purple-600",
    slug: "aure-miya",
  },
  {
    id: 1,
    name: "Lunaria",
    image: lunariaCharacter,
    bgImage: lunariaBgImage,
    isLive: false,
    chapter: "Chapter 1: Origins",
    generation: "Gen 1",
    element: "Stellar",
    subscribers: "15.8K",
    views: "924K",
    rarity: 5,
    token: "$LUNA",
    tokenAmount: "18,920",
    themeColor: "from-blue-600 via-cyan-500 to-purple-600",
    slug: "lunaria",
  },
];

export function TalentsPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<"all" | "live">("all");

  const filteredTalents = talents.filter((talent) => {
    if (filterStatus === "live" && !talent.isLive) return false;
    return true;
  });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with Blur and Overlay */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
          style={{ filter: "blur(8px)" }}
        />
        {/* White overlay with texture */}
        <div className="absolute inset-0 bg-white/85"></div>
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Ornate Styling */}
        <div className="text-center mb-16">
          {/* Decorative Top Border */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>

          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 mb-4"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              lineHeight: "1.2",
            }}
          >
            New Generations of Talents
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover legendary creators across the realm
          </p>

          {/* Decorative Bottom Border */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          </div>
        </div>

        {/* Status Filter Only */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-md border-2 border-purple-200 rounded-2xl p-1.5 md:p-2 shadow-xl">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
              }`}
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              All Talents
            </button>
            <button
              onClick={() => setFilterStatus("live")}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                filterStatus === "live"
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
                  : "text-gray-600 hover:text-gray-900 hover:bg-purple-50"
              }`}
            >
              <Circle className="w-3 h-3 fill-current" />
              Live Now
            </button>
          </div>
        </div>

        {/* Horizontal Character Cards */}
        <div className="flex flex-col gap-8">
          {filteredTalents.map((talent, index) => (
            <div
              key={talent.id}
              onClick={() => navigate(`/talents/${talent.id}`)}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Outer Glow Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

              {/* Main Card */}
              <div className="relative">
                {/* Ornate Corner Decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-purple-400 rounded-tl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-purple-400 rounded-tr-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-purple-400 rounded-bl-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-purple-400 rounded-br-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-purple-100 via-white to-pink-100 p-1 rounded-2xl transition-all duration-500 group-hover:scale-[1.02] shadow-2xl">
                  {/* Inner Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-300/50 group-hover:border-purple-400 transition-colors duration-500"></div>

                  {/* Card Content - Horizontal Layout */}
                  <div className="relative rounded-2xl overflow-hidden flex flex-row h-[200px] md:h-[280px]">
                    {/* Talent Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={talent.bgImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Gradient overlay matching character theme */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${talent.themeColor} opacity-10`}
                    ></div>

                    {/* Decorative Geometric Pattern Background */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                      }}
                    ></div>

                    {/* Character PNG - Left Side, Bust-up */}
                    <div className="relative w-2/5 md:w-1/3 h-full flex items-start justify-center overflow-hidden flex-shrink-0 z-20">
                      {/* Character Image - Bust Up, 400% zoom */}
                      <img
                        src={talent.image}
                        alt={talent.name}
                        className="relative w-auto transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
                        style={{
                          height: "250%",
                          objectFit: "cover",
                          objectPosition: "top center",
                          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
                        }}
                      />

                      {/* Sparkle Effects around Character */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <Sparkles
                            key={i}
                            className="absolute w-5 h-5 text-yellow-400 animate-ping"
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: "2s",
                            }}
                          />
                        ))}
                      </div>

                      {/* Live Badge - repositioned */}
                      {talent.isLive && (
                        <div className="absolute top-4 left-4 z-30">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-lg animate-pulse"></div>
                            <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl border-2 border-white/70">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              <span className="font-bold text-sm tracking-widest">
                                LIVE
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info Panel - Right Side with Genshin Typography */}
                    <div className="relative flex-1 p-6 flex flex-col z-20">
                      {/* View Profile Link - Top Right */}
                      <div className="absolute top-6 right-6 z-30">
                        <button className="text-white font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-purple-200">
                          View Profile →
                        </button>
                      </div>

                      {/* Top Section - Name, Chapter, Token, Stats */}
                      <div className="flex-1">
                        {/* Name & Chapter */}
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`h-1 w-12 bg-gradient-to-r ${talent.themeColor} rounded-full`}
                            ></div>
                            <Sparkles className={`w-4 h-4 text-white`} />
                          </div>

                          <h3
                            className="text-white mb-1 drop-shadow-lg"
                            style={{
                              fontFamily: "var(--font-accent)",
                              fontSize: "2.5rem",
                              lineHeight: "0.95",
                              letterSpacing: "-0.02em",
                              textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                            }}
                          >
                            {talent.name}
                          </h3>

                          <p className="text-white/90 font-bold tracking-wide drop-shadow-lg">
                            {talent.chapter}
                          </p>
                        </div>

                        {/* Token Price & Stats in Row */}
                        <div className="flex items-center gap-3">
                          {/* Token Price */}
                          <div
                            className={`inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300/50 rounded-xl px-3 py-2 shadow-lg`}
                          >
                            <div
                              className={`p-1 bg-gradient-to-br ${talent.themeColor} rounded-lg`}
                            >
                              <Gem className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-purple-600">
                                {talent.tokenAmount}
                              </div>
                              <div className="text-xs text-gray-500 font-bold">
                                {talent.token}
                              </div>
                            </div>
                          </div>

                          {/* Followers Stat */}
                          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                            <div className="bg-purple-100 rounded-lg p-1.5">
                              <Users className="w-3 h-3 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 font-bold uppercase">
                                Followers
                              </div>
                              <div className="font-bold text-gray-900">
                                {talent.subscribers}
                              </div>
                            </div>
                          </div>

                          {/* Views Stat */}
                          <div className="bg-white/80 backdrop-blur-sm border-2 border-pink-200/50 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                            <div className="bg-pink-100 rounded-lg p-1.5">
                              <Eye className="w-3 h-3 text-pink-600" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 font-bold uppercase">
                                Views
                              </div>
                              <div className="font-bold text-gray-900">
                                {talent.views}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Constellation Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Sparkles
                    key={i}
                    className="absolute w-2 h-2 text-purple-300"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${i % 2 === 0 ? 10 : 90}%`,
                      opacity: 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
