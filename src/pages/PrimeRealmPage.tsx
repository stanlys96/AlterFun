import { useState } from "react";
import {
  Crown,
  Lock,
  Ticket,
  Gavel,
  Users,
  DollarSign,
  Gem,
} from "lucide-react";
import { TokenSelector, TokenOption } from "../components/TokenSelector";

export function PrimeRealmPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [tokenBalance] = useState(0); // Mock: 0 tokens
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
  const estimatedMonthlyTokens = Math.floor(stakeAmount * 0.03);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark Premium */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-32 pb-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-full text-yellow-400 font-semibold mb-6">
                <Crown className="w-5 h-5" />
                <span>Exclusive Membership</span>
              </div>

              <h1
                className="text-6xl mb-6"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Unlock the
                <br />
                Prime Status
              </h1>

              <p className="text-white/80 text-xl mb-8 max-w-xl">
                Hold <span className="text-yellow-400 font-bold">$CREATOR</span>{" "}
                to access exclusive content, early drops, and shape the future
                of AlterFUN.
              </p>

              {/* Stats Ticker */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-white/70 text-sm mb-1">
                    Current Price
                  </div>
                  <div className="text-white text-2xl font-bold">$0.85</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3">
                  <div className="text-white/70 text-sm mb-1">
                    Prime Members
                  </div>
                  <div className="text-white text-2xl font-bold">1,205</div>
                </div>
              </div>

              {!isConnected ? (
                <button
                  onClick={() => setIsConnected(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl shadow-yellow-500/50 font-bold text-lg"
                >
                  Connect Wallet
                </button>
              ) : tokenBalance === 0 ? (
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl shadow-yellow-500/50 font-bold text-lg flex items-center gap-2 mx-auto">
                  <Gem className="w-5 h-5" />
                  Buy $CREATOR
                </button>
              ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                  <div className="text-white/70 text-sm mb-2">Your Balance</div>
                  <div className="text-white text-3xl font-bold mb-4 flex items-center gap-2">
                    <Gem className="w-8 h-8 text-yellow-400" />
                    {tokenBalance.toLocaleString()} $CREATOR
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Crown className="w-5 h-5" />
                    <span className="font-semibold">Prime Member Active</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Member Card 3D */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Card */}
                <div className="w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-yellow-500/50 p-8 transform hover:rotate-2 transition-transform duration-500">
                  {/* Card Content */}
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between">
                      <div
                        className="text-yellow-400 font-bold text-xl"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        AlterFUN
                      </div>
                      <Crown className="w-10 h-10 text-yellow-400" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-white/70 text-sm">Member ID</div>
                      <div className="text-white text-2xl font-bold tracking-wider">
                        #PRIME-{isConnected ? "1205" : "****"}
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-white/70 text-xs mb-1">Status</div>
                        <div className="text-yellow-400 font-bold text-lg">
                          PRIME MEMBER
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Prime Benefits
            </h2>
            <p className="text-gray-700 text-xl">
              Exclusive perks reserved for token holders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Time-Gated Content
              </h3>
              <p className="text-gray-700">
                Watch music videos, lore, and blog posts{" "}
                <span className="font-bold text-purple-600">
                  24 hours before the public
                </span>
                . Be the first to experience new content.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="w-8 h-8 text-gray-900" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Priority Access
              </h3>
              <p className="text-gray-700">
                <span className="font-bold text-yellow-600">
                  Guaranteed tickets
                </span>{" "}
                for limited events and early access to support Gen 2 Talents on
                the launchpad.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gavel className="w-8 h-8 text-yellow-400" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Market Power
              </h3>
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">
                  Post bounty requests
                </span>{" "}
                on the Market. Only Prime Members can request rare sold-out
                items from the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Launchpad Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-full text-yellow-700 font-semibold mb-4">
              <Crown className="w-5 h-5" />
              <span>Prime Access Only</span>
            </div>
            <h2
              className="text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Upcoming Debuts
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              Hold{" "}
              <span className="inline-flex items-center gap-1 font-bold text-purple-600">
                <Gem className="w-5 h-5 inline" /> $CREATOR
              </span>{" "}
              to secure your allocation for the next generation of talents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Launchpad Card 1 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="text-gray-700 font-bold text-2xl">
                    Project: Gen 2
                  </div>
                  <div className="text-gray-600">Codename: ECHO</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-green-600 font-semibold mb-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Whitelist Open</span>
                </div>
                {isConnected && tokenBalance > 0 ? (
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold">
                    Join Whitelist
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl cursor-not-allowed font-bold flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Prime Members Only</span>
                  </button>
                )}
              </div>
            </div>

            {/* Launchpad Card 2 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="text-gray-700 font-bold text-2xl">
                    Project: Gen 2
                  </div>
                  <div className="text-gray-600">Codename: NOVA</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-600 font-semibold mb-4">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Coming Soon</span>
                </div>
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl cursor-not-allowed font-bold"
                >
                  Whitelist Not Open
                </button>
              </div>
            </div>

            {/* Launchpad Card 3 */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all hover:shadow-2xl group">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-pink-200 to-yellow-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="text-gray-700 font-bold text-2xl">
                    Project: Gen 2
                  </div>
                  <div className="text-gray-600">Codename: LYRA</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-600 font-semibold mb-4">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Coming Soon</span>
                </div>
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl cursor-not-allowed font-bold"
                >
                  Whitelist Not Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staking/Liquidity Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Support the Ecosystem
            </h2>
            <p className="text-gray-700 text-xl">
              Lock your tokens to provide stability and earn rewards
            </p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              {/* Token Selector */}
              <TokenSelector
                tokens={availableTokens}
                selectedToken={selectedTokenId}
                onSelectToken={setSelectedTokenId}
                label="Select Token:"
                showBalance={true}
              />

              {/* Slider */}
              <div>
                <label className="text-gray-900 font-bold mb-3 block">
                  I want to lock:
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #ec4899 ${
                      (stakeAmount / 10000) * 100
                    }%, #e9d5ff ${(stakeAmount / 10000) * 100}%, #e9d5ff 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>100</span>
                  <span className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                    <Gem className="w-6 h-6" />
                    {stakeAmount.toLocaleString()} {selectedToken.ticker}
                  </span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Estimated Rewards */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="text-gray-700 font-semibold mb-4">
                  Estimated Rewards:
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      +{estimatedMonthlyTokens}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedToken.ticker} per month
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="border-t-2 border-purple-200 pt-4">
                  <div className="text-gray-700 font-semibold mb-3">
                    Staking Benefits:
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Access to{" "}
                        <span className="font-bold">
                          1 private chat per week
                        </span>{" "}
                        with your favorite Talent
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        <span className="font-bold">Voting power</span> on
                        Talent page community decisions
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        <span className="font-bold">Higher priority</span> in
                        merch redemption queues
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        <span className="font-bold">Exclusive badge</span> on
                        your profile & comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {isConnected && tokenBalance > 0 ? (
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:scale-105 transition-all shadow-lg font-bold text-lg">
                  Stake Now
                </button>
              ) : (
                <button
                  onClick={() => !isConnected && setIsConnected(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 py-4 rounded-xl hover:scale-105 transition-all shadow-lg font-bold text-lg"
                >
                  {isConnected
                    ? "Buy $CREATOR to Stake"
                    : "Connect Wallet to Continue"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
