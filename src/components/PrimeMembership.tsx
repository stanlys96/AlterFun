import { Crown, Sparkles, TrendingUp, Shield, Star, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Gem } from "lucide-react";

export function PrimeMembership() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <div className="relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 mb-4 md:mb-6 shadow-2xl">
              {/* Corner ornaments */}
              <div className="absolute -top-1 -left-1 w-3 h-3 md:w-4 md:h-4 border-l-2 border-t-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 border-r-2 border-t-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 md:w-4 md:h-4 border-l-2 border-b-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 border-r-2 border-b-2 border-white"></div>
              <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                lineHeight: "1.2",
              }}
            >
              Become a Prime Member
            </h2>
            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto px-4">
              Buy and Hold{" "}
              <span className="font-bold inline-flex items-center gap-1">
                <Gem className="w-4 h-4 md:w-5 md:h-5 inline" /> CREATOR TOKEN
                ($)
              </span>{" "}
              To Gain VIP Accecss
            </p>
          </div>

          {/* Constellation-Style Benefits */}
          <div className="relative mb-12">
            {/* Connecting Lines - Constellation Style */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
              {/* Benefit 1 */}
              <div className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all hover:scale-105">
                {/* Ornate corner accents - selective */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>

                <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 relative">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl">
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                      Exclusive Badge
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Prime Member Exclusive Badge for your Profile
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all hover:scale-105">
                {/* Ornate corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>

                <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 relative">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl">
                    <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                      Private Circle
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Discord Access & Exclusive Community for Prime Members
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all hover:scale-105">
                {/* Ornate corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>

                <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 relative">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl">
                    <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                      Early Support
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Be the first one to back new talents before they go viral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 text-center px-4">
            <button className="group relative bg-white text-purple-600 px-6 py-3 md:px-10 md:py-5 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/50 w-full sm:w-auto">
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-green-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 font-bold text-base md:text-xl flex items-center justify-center gap-2">
                Become Prime Member
                <Crown className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </button>

            <p className="text-xs md:text-sm text-white/90 max-w-md mx-auto">
              Lifetime access with minimum hold of{" "}
              <span className="inline-flex items-center gap-1 font-bold text-white">
                <Gem className="w-3 h-3 md:w-4 md:h-4 inline" /> 100
              </span>{" "}
              Creator Token
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
