import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Circle, Zap, Clock, Users, Sparkles } from "lucide-react";

export function LiveAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title - Genshin Style */}
        <div className="text-center mb-16">
          {/* Decorative Title Frame */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
            <Sparkles className="w-6 h-6 text-purple-500" />
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-green-100 border-2 border-purple-300 px-6 py-3 rounded-xl shadow-lg relative">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-500"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-purple-500"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500"></div>
              <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
              <span className="text-sm text-purple-900 font-bold uppercase tracking-wider">
                Live Drop Active
              </span>
            </div>
            <Sparkles className="w-6 h-6 text-purple-500" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-green-400 rounded-full"></div>
          </div>

          <h2
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "3.5rem",
              lineHeight: "1.2",
            }}
          >
            Complete Missions, Earn Rewards
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Earn Sparks to Get Vtuber Merch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Column A - The Stream */}
          <div className="space-y-6">
            {/* Ornate Stream Card */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border-2 border-purple-300">
              {/* Corner Decorations - Selective Ornate */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400 z-10"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-400 z-10"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-400 z-10"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400 z-10"></div>

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706246448963-0b494178e293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsaXZlJTIwc3RyZWFtfGVufDF8fHx8MTc2NDIwNDUyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Live Stream"
                className="w-full aspect-video object-cover"
              />

              {/* Live Badge - Enhanced */}
              <div className="absolute top-4 left-4 z-20">
                <div className="relative">
                  {/* Pulsing outer glow ring */}
                  <div className="absolute inset-0 bg-red-500 rounded-xl blur-lg animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border-2 border-white/70">
                    <Circle className="w-2.5 h-2.5 fill-white animate-pulse" />
                    <span className="font-bold tracking-wide">LIVE NOW</span>
                  </div>
                </div>
              </div>

              {/* Viewer Count */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 border border-purple-200 shadow-lg z-20">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-bold">12,847</span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 border border-purple-200 shadow-lg z-20">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="font-bold">2:34:12</span>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-green-500 shadow-lg"></div>
                <div>
                  <h3 className="text-gray-900 text-xl font-bold">Auremiya</h3>
                  <p className="text-gray-600">
                    Playing Genshin Impact • Just Chatting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column B - Rare Drop Quest Card */}
          <div className="relative bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 border-2 border-purple-300 shadow-2xl">
            {/* Corner Ornaments - Selective */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>

            <div className="space-y-6 relative">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white rounded-xl blur-md opacity-30"></div>
                  <Zap className="w-4 h-4 fill-white relative z-10" />
                  <span className="font-bold relative z-10">Rare Drop</span>
                </div>
                <div className="text-gray-700 text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Ends in 2h 15m
                </div>
              </div>

              <div>
                <h3
                  className="text-gray-900 text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Limited Edition Acrylic Stand
                </h3>
                <p className="text-gray-700">
                  Tonton stream ini untuk mendapatkan kesempatan klaim item
                  eksklusif ini
                </p>
              </div>

              {/* Merch Display - Rare Drop Style */}
              <div className="relative bg-white border-2 border-purple-300 rounded-2xl p-5 shadow-md">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="flex items-center gap-4 relative">
                  <div className="relative w-28 h-28 bg-gradient-to-br from-purple-200 to-green-200 rounded-xl overflow-hidden flex-shrink-0 border-2 border-purple-300">
                    {/* Rare glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-green-400/20"></div>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1732057401307-d359adf8ab83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwc3RhbmRlZXxlbnwxfHx8fDE3NjQyMDQ1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Acrylic Stand"
                      className="relative w-full h-full object-cover z-10"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-bold text-lg mb-1">
                      Auremiya Acrylic Stand
                    </div>
                    <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      Limited to 500 pieces
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-green-100 border-2 border-purple-400 rounded-lg px-3 py-2 w-fit shadow-md">
                      <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <span className="text-gray-900 font-bold">
                        2,500 Sparks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar with Shimmer */}
              <div className="bg-gradient-to-r from-purple-200 to-green-200 border-2 border-purple-300 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-900 font-semibold">
                    Watch Progress
                  </span>
                  <span className="text-sm text-purple-900 font-bold">
                    45 mins watched
                  </span>
                </div>
                <div className="relative w-full bg-white rounded-full h-3 overflow-hidden border-2 border-purple-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 rounded-full transition-all"
                    style={{ width: "75%" }}
                  ></div>
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-700 mt-2">
                  15 minutes remaining to unlock
                </div>
              </div>

              {/* CTA Button */}
              <button className="group relative w-full bg-gradient-to-r from-purple-600 to-green-600 text-white py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 font-bold text-lg flex items-center justify-center gap-2">
                  Start Watching
                  <Circle className="w-4 h-4 fill-white" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
