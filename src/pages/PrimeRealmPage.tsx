import { useState } from "react";
import {
  Crown,
  Lock,
  Ticket,
  Gavel,
  Users,
  DollarSign,
  Zap,
  Gem,
  Sparkles,
  Star,
  TrendingUp,
  Calendar,
  MessageCircle,
  Shield,
  Award,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TokenSelector, TokenOption } from "../components/TokenSelector";
const primeRealmBg = "figma:asset/faa732a89611af79ff82f93da833515bf023e295.png";

export function PrimeRealmPage() {
  const [isMember, setIsMember] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [selectedTokenId, setSelectedTokenId] = useState("yami");

  // Available tokens for staking
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
  ];

  const selectedToken =
    availableTokens.find((t) => t.id === selectedTokenId) || availableTokens[0];
  const estimatedMonthlyTokens = Math.floor(stakeAmount * 0.03);

  // BEFORE CONNECT - Landing Page with Dark Genshin Aesthetic
  if (!isMember) {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        {/* Background Image - Bottom Aligned with Gradient Overlay */}
        <div className="fixed inset-0 overflow-hidden">
          {/* Cyber City Background Image */}
          <img
            src={primeRealmBg}
            alt=""
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom"
            style={{ objectPosition: "center bottom" }}
          />

          {/* Gradient Overlay - Top to Bottom (dark to transparent) */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/60 to-transparent"></div>

          {/* Additional subtle purple tint overlay */}
          <div className="absolute inset-0 bg-purple-950/30"></div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Animated Accent Effects (kept minimal to not compete with bg image) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle glow orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

            {/* Floating Sparkles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-4 h-4 text-yellow-400/20 animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            {/* Decorative Top Border */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
              <Crown className="w-8 h-8 text-yellow-500 animate-pulse" />
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            </div>

            <div className="text-center max-w-4xl mx-auto px-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border-2 border-yellow-500/30 px-3 py-2 md:px-5 md:py-2.5 rounded-full text-yellow-400 font-bold text-sm md:text-base mb-6 md:mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                <span>Exclusive Membership</span>
              </div>

              {/* Main Heading */}
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4 md:mb-6"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  lineHeight: "1.1",
                  textShadow: "0 0 40px rgba(234, 179, 8, 0.3)",
                }}
              >
                Prime Realm
              </h1>

              <p className="text-white/80 text-base md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Hold any{" "}
                <span className="text-yellow-400 font-bold">
                  $CREATOR token
                </span>{" "}
                to unlock the gateway to exclusive benefits and shape AlterFUN's
                destiny
              </p>

              {/* Prime Benefits Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                {[
                  {
                    icon: MessageCircle,
                    title: "Exclusive Access",
                    description:
                      "Access to prime-first discord channel with selected Vtubers",
                    gradient: "from-purple-600 to-purple-500",
                  },
                  {
                    icon: Award,
                    title: "Market Priority",
                    description:
                      "Guaranteed early whitelist access for Gen 2 Talent Launches",
                    gradient: "from-purple-600 to-purple-500",
                  },
                  {
                    icon: Gem,
                    title: "Stake Token",
                    description:
                      "Earn staking rewards by holding Creator Tokens and grow your collection over time.",
                    gradient: "from-purple-600 to-purple-500",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="group relative">
                    {/* Ornate corners */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-500/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-purple-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                    {/* Card */}
                    <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 group-hover:border-purple-500/50 transition-all duration-500 h-full flex flex-col items-center text-center">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                      >
                        <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3
                        className="text-white text-xl md:text-2xl font-bold mb-2 md:mb-3"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-10 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
              </div>

              <h2
                className="text-white mb-4"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  lineHeight: "1.2",
                }}
              >
                How to Join
              </h2>
              <p className="text-white/70 text-base md:text-xl">
                Three steps to unlock Prime benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  num: 1,
                  title: "Connect Wallet",
                  desc: "Link your wallet to verify token holdings",
                },
                {
                  num: 2,
                  title: "Hold $CREATOR",
                  desc: "Own any Talent's $CREATOR token",
                },
                {
                  num: 3,
                  title: "Enjoy Benefits",
                  desc: "Access all Prime features instantly",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  {/* Arrow */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-purple-500/50" />
                    </div>
                  )}

                  {/* Card */}
                  <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-purple-500/50 transition-all duration-500">
                    {/* Number */}
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white text-xl md:text-2xl font-bold shadow-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-8 md:mt-12">
              <button
                onClick={() => setIsMember(true)}
                className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:rotate-12 transition-transform" />
                  <span className="font-bold text-base md:text-lg text-white">
                    Get Started Now
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Decorative */}
        <div className="flex items-center justify-center gap-4 pb-16">
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>
      </div>
    );
  }

  // AFTER CONNECT - Member Dashboard (Dark Theme)
  return (
    <div className="min-h-screen bg-gray-900 relative pt-24 pb-16">
      {/* Background Image - Same as landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Cyber City Background Image */}
        <img
          src={primeRealmBg}
          alt=""
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom"
          style={{ objectPosition: "center bottom" }}
        />

        {/* Gradient Overlay - Top to Bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/60 to-transparent"></div>

        {/* Purple tint overlay */}
        <div className="absolute inset-0 bg-purple-950/30"></div>

        {/* Subtle accent glows */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

        {/* Floating sparkles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-3 h-3 text-purple-400/20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>

            <div className="relative bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-8 overflow-hidden">
              {/* Decorative glow orb */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 px-4 py-2 rounded-full text-yellow-400 font-semibold mb-4">
                    <Crown className="w-4 h-4" />
                    <span>Prime Member</span>
                  </div>
                  <h1
                    className="text-white text-4xl mb-2"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Welcome Back!
                  </h1>
                  <p className="text-white/70">
                    Your exclusive benefits are active
                  </p>
                </div>

                {/* Right: Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3 min-w-[140px]">
                    <div className="text-white/60 text-xs mb-1">
                      Member Since
                    </div>
                    <div className="text-white font-bold">Dec 2024</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3 min-w-[140px]">
                    <div className="text-white/60 text-xs mb-1">
                      Total Staked
                    </div>
                    <div className="text-white font-bold flex items-center gap-1">
                      <Gem className="w-4 h-4 text-yellow-400" />
                      18,600
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Benefits */}
        <section className="mb-12">
          <h2
            className="text-white text-2xl md:text-3xl mb-6"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Your Active Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Ticket,
                title: "Priority Access",
                desc: "Guaranteed tickets for limited events and early whitelist access to Gen 2 Talent launches.",
              },
              {
                icon: Award,
                title: "Market Priority",
                desc: "Skip the queue for limited merch drops and get exclusive access to Official Store items.",
              },
              {
                icon: TrendingUp,
                title: "Stake Token",
                desc: "Earn staking rewards by holding Creator Tokens and grow your collection over time.",
              },
            ].map((benefit, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>

                <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 group-hover:border-purple-500/50 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1"></div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Staking Section */}
        <section className="mb-12">
          <h2
            className="text-white text-3xl mb-6"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Stake & Earn Rewards
          </h2>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>

            <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {/* Token Dropdown */}
                <div>
                  <label className="text-white font-bold mb-3 block text-sm md:text-base">
                    Select Token to Stake:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTokenId}
                      onChange={(e) => setSelectedTokenId(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold appearance-none cursor-pointer hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {availableTokens.map((token) => (
                        <option
                          key={token.id}
                          value={token.id}
                          className="bg-gray-900 text-white"
                        >
                          {token.name} ({token.ticker}) - Balance:{" "}
                          {token.balance.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none rotate-90" />
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    Available:{" "}
                    <span className="text-purple-400 font-bold">
                      {selectedToken.balance.toLocaleString()}
                    </span>{" "}
                    {selectedToken.ticker}
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <label className="text-white font-bold mb-3 block text-sm md:text-base">
                    Amount to Lock:
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    className="w-full h-3 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #9333ea 0%, #ec4899 ${
                        (stakeAmount / 10000) * 100
                      }%, rgba(147, 51, 234, 0.2) ${
                        (stakeAmount / 10000) * 100
                      }%, rgba(147, 51, 234, 0.2) 100%)`,
                    }}
                  />
                  <div className="flex justify-between items-center text-sm text-white/60 mt-3">
                    <span>100</span>
                    <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Gem className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                      {stakeAmount.toLocaleString()} {selectedToken.ticker}
                    </span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Rewards Preview */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-gray-900" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-white/60 mb-1">
                        Estimated Monthly Rewards
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        +{estimatedMonthlyTokens} {selectedToken.ticker}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="border-t border-purple-500/30 pt-4">
                    <div className="text-sm text-white/80 font-semibold mb-3">
                      Staking Perks:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                      {[
                        "Private chat access",
                        "Voting power",
                        "Queue priority",
                        "Exclusive badge",
                      ].map((perk, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-white/80"
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 md:py-4 rounded-xl hover:scale-105 transition-all shadow-lg font-bold text-base md:text-lg">
                  Stake {stakeAmount.toLocaleString()} {selectedToken.ticker}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gen 2 Launchpad */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-white text-3xl"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Gen 2 Launchpad
            </h2>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 px-3 py-1.5 rounded-full text-green-400 font-semibold text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Prime Access</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "ECHO",
                status: "open",
                gradient: "from-purple-200 to-pink-200",
                available: true,
              },
              {
                name: "NOVA",
                status: "soon",
                gradient: "from-blue-200 to-purple-200",
                available: false,
              },
              {
                name: "LYRA",
                status: "soon",
                gradient: "from-pink-200 to-yellow-200",
                available: false,
              },
            ].map((project, i) => (
              <div key={i} className="group relative">
                {project.available && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
                )}

                <div
                  className={`relative bg-black/40 backdrop-blur-md border ${
                    project.available
                      ? "border-purple-500/30"
                      : "border-white/10"
                  } rounded-2xl overflow-hidden ${
                    project.available ? "group-hover:border-purple-500/50" : ""
                  } transition-all duration-500`}
                >
                  <div
                    className={`aspect-[4/5] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-12 h-12 text-gray-800" />
                      </div>
                      <div className="text-gray-800 font-bold text-xl">
                        Project {project.name}
                      </div>
                      <div className="text-gray-600 text-sm">Gen 2 Debut</div>
                    </div>
                  </div>
                  <div className="p-6">
                    {project.available ? (
                      <>
                        <div className="flex items-center gap-2 text-green-400 font-semibold mb-4 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Whitelist Open</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all font-bold">
                          Join Whitelist
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-yellow-400/70 font-semibold mb-4 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>Coming Soon</span>
                        </div>
                        <button
                          disabled
                          className="w-full bg-white/5 text-white/40 py-3 rounded-xl cursor-not-allowed font-bold border border-white/10"
                        >
                          Not Open Yet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsMember(false)}
            className="text-white/50 hover:text-purple-400 text-sm underline transition-colors"
          >
            (Demo: View Landing Page)
          </button>
        </div>
      </div>
    </div>
  );
}
