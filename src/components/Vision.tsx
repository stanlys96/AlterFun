import { Users, TrendingUp, Gift, ArrowRight } from "lucide-react";

export function Vision() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-gray-900 mb-4"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "3.5rem",
                lineHeight: "1.2",
              }}
            >
              Our Vision
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Membangun ekosistem berkelanjutan yang menguntungkan Creator dan
              Fans
            </p>
          </div>

          {/* Flywheel Diagram */}
          <div className="mb-20">
            <div className="relative">
              {/* Connecting lines */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

              {/* Flywheel Steps */}
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-2 border-purple-300 rounded-2xl p-8 text-center space-y-6 hover:border-purple-500 transition-all shadow-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      1
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-xl font-bold mb-3">
                        Fans Action
                      </h3>
                      <p className="text-gray-700">
                        Fans menonton, berinteraksi, dan mendukung Creator
                        favorit mereka
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-2 border-purple-300 rounded-2xl p-8 text-center space-y-6 hover:border-purple-500 transition-all md:mt-12 shadow-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      2
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-xl font-bold mb-3">
                        Hype Grows
                      </h3>
                      <p className="text-gray-700">
                        Creator mendapat traction, engagement meningkat, value
                        naik
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white border-2 border-purple-300 rounded-2xl p-8 text-center space-y-6 hover:border-purple-500 transition-all shadow-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl">
                      <Gift className="w-8 h-8 text-white" />
                    </div>

                    <div
                      className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      3
                    </div>

                    <div>
                      <h3 className="text-gray-900 text-xl font-bold mb-3">
                        Better Rewards
                      </h3>
                      <p className="text-gray-700">
                        Fans mendapat merch eksklusif, Creator dapat sustainable
                        income
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-2xl opacity-30"></div>

            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-3xl p-10 shadow-2xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h3
                  className="text-gray-900 text-3xl font-bold"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Sustainable Creator Economy
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed">
                  AlterFUN adalah jembatan profesional antara Creator (Vtuber)
                  dengan Fans & Investor. Kami membangun platform yang{" "}
                  <span className="text-purple-900 font-bold">
                    transparan, aman, dan menguntungkan semua pihak
                  </span>
                  . Bukan sekadar platform transaksi, tapi ekosistem yang
                  memberdayakan kreator untuk fokus berkarya sambil fans
                  mendapatkan nilai nyata dari dukungan mereka.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <div className="bg-white border border-purple-300 rounded-xl px-6 py-3 shadow-lg">
                    <div
                      className="text-2xl font-bold text-purple-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      10K+
                    </div>
                    <div className="text-sm text-gray-700">Active Fans</div>
                  </div>
                  <div className="bg-white border border-purple-300 rounded-xl px-6 py-3 shadow-lg">
                    <div
                      className="text-2xl font-bold text-purple-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      50+
                    </div>
                    <div className="text-sm text-gray-700">Creators</div>
                  </div>
                  <div className="bg-white border border-purple-300 rounded-xl px-6 py-3 shadow-lg">
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
