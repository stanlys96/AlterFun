import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Circle, Zap, Clock, Users } from "lucide-react";

export function LiveAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 px-6 py-3 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span className="text-sm text-purple-900 font-semibold">
              Live Drop Active
            </span>
          </div>

          <h2
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "3.5rem",
              lineHeight: "1.2",
            }}
          >
            Nonton = Dapet Merch
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Kerjakan misi untuk mendapatkan Reward eksklusif.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Column A - The Stream */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706246448963-0b494178e293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsaXZlJTIwc3RyZWFtfGVufDF8fHx8MTc2NDIwNDUyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Live Stream"
                className="w-full aspect-video object-cover"
              />

              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <Circle className="w-2.5 h-2.5 fill-white animate-pulse" />
                <span className="font-bold">LIVE NOW</span>
              </div>

              {/* Viewer Count */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-200 shadow-lg">
                <Users className="w-4 h-4" />
                <span className="font-bold">12,847</span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-200 shadow-lg">
                <Clock className="w-4 h-4" />
                <span className="font-bold">2:34:12</span>
              </div>
            </div>

            <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                <div>
                  <h3 className="text-gray-900 text-xl font-bold">Auremiya</h3>
                  <p className="text-gray-600">
                    Playing Genshin Impact • Just Chatting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column B - The Active Drop */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-300 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg">
                  <Zap className="w-4 h-4 fill-white" />
                  <span className="font-bold">Active Drop</span>
                </div>
                <div className="text-gray-700 text-sm font-semibold">
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

              <div className="bg-white border border-purple-200 rounded-2xl p-5 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden flex-shrink-0 border border-purple-300">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1732057401307-d359adf8ab83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwc3RhbmRlZXxlbnwxfHx8fDE3NjQyMDQ1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Acrylic Stand"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-bold text-lg mb-1">
                      Auremiya Acrylic Stand
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Limited to 500 pieces
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg px-3 py-2 w-fit">
                      <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <span className="text-gray-900 font-bold">
                        2,500 Sparks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-200 to-pink-200 border border-purple-300 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-900 font-semibold">
                    Watch Progress
                  </span>
                  <span className="text-sm text-purple-900 font-bold">
                    45 mins watched
                  </span>
                </div>
                <div className="relative w-full bg-white rounded-full h-3 overflow-hidden border border-purple-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-700 mt-2">
                  15 minutes remaining to unlock
                </div>
              </div>

              <button className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 font-bold text-lg flex items-center justify-center gap-2">
                  Start Watching
                  <Circle className="w-4 h-4 fill-white" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
