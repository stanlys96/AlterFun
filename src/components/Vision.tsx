import { Users, TrendingUp, Gift, ArrowRight, Sparkles } from "lucide-react";

export function Vision() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Title - Genshin Style */}
          <div className="text-center mb-20">
            {/* Decorative Title Frame */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h2
                className="text-gray-900"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  lineHeight: "1.2",
                }}
              >
                Our Vision
              </h2>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              <div className="h-1 w-12 md:w-20 bg-gradient-to-l from-transparent to-green-400 rounded-full"></div>
            </div>
            <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              Building a sustainable ecosystem that empowers both Creators and
              Fans.
            </p>
          </div>

          {/* Flywheel Diagram - Ornate Style */}
          <div className="mb-12 md:mb-20">
            <div className="relative">
              {/* Connecting energy flow lines */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>

              {/* Flywheel Steps with Ornate Frames */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-green-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-4 border-purple-300 rounded-2xl p-6 md:p-8 text-center space-y-4 md:space-y-6 hover:border-purple-500 transition-all shadow-xl">
                    {/* Corner ornaments - selective */}
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-purple-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-purple-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-purple-500"></div>

                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-purple-600 shadow-xl">
                      <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-lg text-sm md:text-base"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      1
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-lg md:text-xl font-bold mb-2 md:mb-3">
                        Fans Action
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Fans watch, interact, and actively support their
                        favorite Creators.
                      </p>
                    </div>
                  </div>

                  {/* Energy flow arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 to-green-400 opacity-50"></div>
                      <ArrowRight className="relative w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-green-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-4 border-purple-300 rounded-2xl p-6 md:p-8 text-center space-y-4 md:space-y-6 hover:border-purple-500 transition-all md:mt-12 shadow-xl">
                    {/* Corner ornaments */}
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-purple-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-purple-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-purple-500"></div>

                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-purple-600 shadow-xl">
                      <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-lg text-sm md:text-base"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      2
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-lg md:text-xl font-bold mb-2 md:mb-3">
                        Hype Grows
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Creators gain traction, engagement skyrockets, and IP
                        value increases.
                      </p>
                    </div>
                  </div>

                  {/* Energy flow arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 to-green-400 opacity-50"></div>
                      <ArrowRight className="relative w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-green-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-4 border-purple-300 rounded-2xl p-6 md:p-8 text-center space-y-4 md:space-y-6 hover:border-purple-500 transition-all shadow-xl">
                    {/* Corner ornaments */}
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-purple-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-purple-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-purple-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-purple-500"></div>

                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-purple-600 shadow-xl">
                      <Gift className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-lg text-sm md:text-base"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      3
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-xl font-bold mb-3">
                        Better Rewards
                      </h3>
                      <p className="text-gray-700">
                        Fans earn exclusive merchandise, while Creators secure a
                        sustainable income.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement - Parchment Style */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-green-300 rounded-3xl blur-2xl opacity-30"></div>

            <div className="relative bg-gradient-to-br from-purple-100 to-green-100 border-4 border-purple-300 rounded-3xl p-10 shadow-2xl">
              {/* Ornate corners - selective */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-purple-500"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-purple-500"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-green-500"></div>

              {/* Decorative seal/stamp */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-600 to-green-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <div className="max-w-3xl mx-auto text-center space-y-6 relative">
                <h3
                  className="text-gray-900 text-3xl font-bold"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Sustainable Creator Economy
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed">
                  AlterFUN is the professional bridge between VTubers, Fans, and
                  Investors. We prioritize{" "}
                  <span className="text-purple-900 font-bold">
                    transparency, security, and shared growth
                  </span>
                  . This isn't just a platform; it's an ecosystem where Creators
                  focus on art, and Fans get real value for their passion.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <div className="bg-white border-2 border-purple-300 rounded-xl px-6 py-3 shadow-lg">
                    <div
                      className="text-2xl font-bold text-purple-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      10K+
                    </div>
                    <div className="text-sm text-gray-700">Active Fans</div>
                  </div>
                  <div className="bg-white border-2 border-purple-300 rounded-xl px-6 py-3 shadow-lg">
                    <div
                      className="text-2xl font-bold text-purple-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      50+
                    </div>
                    <div className="text-sm text-gray-700">Creators</div>
                  </div>
                  <div className="bg-white border-2 border-purple-300 rounded-xl px-6 py-3 shadow-lg">
                    <div
                      className="text-2xl font-bold text-purple-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      $2M+
                    </div>
                    <div className="text-sm text-gray-700">
                      Rewards Distributed
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
