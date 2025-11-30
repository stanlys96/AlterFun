import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, Sparkles } from "lucide-react";

const heroImage = "/images/alterfun.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white pt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white border border-purple-200 shadow-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-900 font-semibold">
                  Platform Creator Economy Masa Depan
                </span>
              </div>

              <h1
                className="text-gray-900"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <span className="block text-5xl lg:text-7xl leading-tight mb-2">
                  Dukung Streamer
                </span>
                <span className="block text-5xl lg:text-7xl leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Favoritmu
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 max-w-xl">
                Dan dapatkan{" "}
                <span className="text-purple-900 font-semibold">
                  official merch eksklusif
                </span>
                , bebas biaya.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-bold">
                  Cek Merch
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="border-2 border-purple-300 text-purple-900 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative z-10">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src={heroImage}
                  alt="AlterFUN Talent"
                  className="w-full h-auto aspect-[4/5] object-cover"
                />

                {/* Floating Stats */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-purple-200 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-900 font-bold">
                      12.8K Watching
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Merch Card - Bottom Right */}
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-xl border border-purple-200 rounded-2xl p-4 shadow-2xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1659082056845-3b839c7551bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1lcmNoYW5kaXNlJTIwaG9vZGllfGVufDF8fHx8MTc2NDIwNDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Exclusive Hoodie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-bold">
                      Exclusive Hoodie
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      Limited Edition
                    </div>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Zap className="w-3 h-3 fill-purple-600" />
                      <span className="text-xs font-bold">2,500 Sparks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
