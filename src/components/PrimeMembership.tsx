import { Crown, Sparkles, TrendingUp, Shield, Star, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Gem } from "lucide-react";

export function PrimeMembership() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-6 shadow-2xl">
              <Crown className="w-10 h-10 text-white" />
            </div>

            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "3.5rem",
                lineHeight: "1.2",
              }}
            >
              Become a Prime Member
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Hold{" "}
              <span className="font-bold inline-flex items-center gap-1">
                <Gem className="w-5 h-5 inline" /> $CREATOR
              </span>{" "}
              untuk membuka akses VIP eksklusif
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Benefit 1 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    Badge Khusus
                  </h3>
                  <p className="text-white/80">
                    Tampilkan status Prime Member dengan badge eksklusif di
                    profil kamu
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    Private Circle
                  </h3>
                  <p className="text-white/80">
                    Akses Discord & komunitas eksklusif hanya untuk Prime
                    Members
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    Early Support
                  </h3>
                  <p className="text-white/80">
                    Jadilah yang pertama mendukung talent baru sebelum mereka
                    viral
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <button className="group relative bg-white text-purple-600 px-10 py-5 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/50">
              <span className="relative z-10 font-bold text-xl flex items-center justify-center gap-2">
                Become Prime Member
                <Crown className="w-5 h-5" />
              </span>
            </button>

            <p className="text-sm text-white/90 max-w-md mx-auto">
              Akses seumur hidup selama kamu hold minimal{" "}
              <span className="inline-flex items-center gap-1 font-bold text-white">
                <Gem className="w-4 h-4 inline" /> 100
              </span>{" "}
              total dari semua token
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
