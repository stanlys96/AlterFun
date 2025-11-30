import {
  Zap,
  Gem,
  Users,
  TrendingUp,
  Sparkles,
  Shield,
  Target,
  Rocket,
} from "lucide-react";
import { Footer } from "../components";

export function AboutPage() {
  return (
    <div>
      <div className="min-h-screen bg-white pt-20">
        {/* HERO SECTION: THE VISION */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 py-32 overflow-hidden">
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
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-white mb-8"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: "4.5rem",
                  lineHeight: "1.1",
                }}
              >
                Empowering the Next Generation of Virtual Creators.
              </h1>
              <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                AlterFUN adalah jembatan menuju{" "}
                <span className="font-bold">
                  Internet Capital Markets (ICM)
                </span>
                . Kami mengubah Fandom menjadi Aset, dan Creator menjadi
                Scalable IP.
              </p>
            </div>
          </div>
        </section>

        {/* THE STORY: WHY WE EXIST */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* The Problem */}
                <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 mb-6">
                    <Target className="w-7 h-7 text-red-600" />
                  </div>
                  <h3
                    className="text-gray-900 mb-6"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "2rem",
                    }}
                  >
                    The Problem
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Industri VTuber dibangun di atas talenta luar biasa, namun
                    model pendapatan tradisional seringkali tidak berkelanjutan.
                    Kreator berbakat mengalami{" "}
                    <span className="font-bold">burnout</span> karena mengejar
                    setoran, dan banyak IP brilian gagal mencapai potensi
                    maksimalnya karena kurang pendanaan.
                  </p>
                </div>

                {/* The Solution */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3
                    className="text-white mb-6"
                    style={{
                      fontFamily: "var(--font-accent)",
                      fontSize: "2rem",
                    }}
                  >
                    The Solution
                  </h3>
                  <p className="text-white/95 leading-relaxed">
                    Kami mendobrak batasan tersebut. AlterFUN memungkinkan
                    kreator untuk{" "}
                    <span className="font-bold">
                      menokenisasi Kekayaan Intelektual (IP)
                    </span>{" "}
                    mereka. Ini memberi mereka akses modal langsung dari
                    penggemar dan investor yang percaya pada pertumbuhan mereka,
                    bukan sekadar donasi satu arah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR MECHANISM: THE TWO ECONOMIES */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "3.5rem",
                  }}
                >
                  The Two Economies
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Ekosistem kami menyatukan dua dunia yang berbeda namun
                  sinergis
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Sweat Economy */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-10 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3
                        className="text-gray-900"
                        style={{
                          fontFamily: "var(--font-accent)",
                          fontSize: "2rem",
                        }}
                      >
                        Sweat Economy
                      </h3>
                    </div>
                    <div className="inline-block bg-orange-100 px-3 py-1 rounded-full mb-4">
                      <span className="text-orange-900 font-bold">Action</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Didukung oleh <span className="font-bold">fans</span> yang
                      berkontribusi lewat waktu, energi, dan keterlibatan
                      (misi).
                    </p>
                    <p className="text-gray-900 font-bold">
                      Kalian membangun nilai IP melalui aktivitas nyata.
                    </p>
                  </div>
                </div>

                {/* Capital Economy */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg">
                        <Gem className="w-8 h-8 text-white" />
                      </div>
                      <h3
                        className="text-gray-900"
                        style={{
                          fontFamily: "var(--font-accent)",
                          fontSize: "2rem",
                        }}
                      >
                        Capital Economy
                      </h3>
                    </div>
                    <div className="inline-block bg-purple-100 px-3 py-1 rounded-full mb-4">
                      <span className="text-purple-900 font-bold">
                        Investment
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Didukung oleh <span className="font-bold">investor</span>{" "}
                      dan 'Prime Members' yang menyuntikkan likuiditas.
                    </p>
                    <p className="text-gray-900 font-bold">
                      Kalian menangkap nilai finansial dari pertumbuhan aset
                      tersebut.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bridge Statement */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
                <p className="text-2xl text-white leading-relaxed">
                  <span className="font-bold">We bridge these worlds</span> —
                  allowing fans to{" "}
                  <span className="underline decoration-2">
                    build value through sweat equity
                  </span>
                  , and investors to{" "}
                  <span className="underline decoration-2">
                    capture value through capital injection
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TRUST US? (THE TEAM) */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-100 mb-6">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
                <h2
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "3.5rem",
                  }}
                >
                  Built by Industry Veterans.
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Kami bukan pengembang anonim; kami adalah veteran industri.
                  Selama 5 tahun terakhir, tim kami telah bekerja di balik layar
                  dengan nama-nama terbesar di industri VTuber.
                </p>
              </div>

              {/* Track Record */}
              <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
                <h3
                  className="text-center text-gray-900 mb-10"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "1.75rem",
                  }}
                >
                  Experience Track Record
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Nijisanji */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all hover:shadow-lg group">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-bold text-gray-900">Nijisanji</p>
                  </div>

                  {/* Digikagi */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all hover:shadow-lg group">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-bold text-gray-900">Digikagi</p>
                  </div>

                  {/* AKA Virtual */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all hover:shadow-lg group">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-bold text-gray-900">AKA Virtual</p>
                  </div>

                  {/* pvc.moe */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-all hover:shadow-lg group">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-bold text-gray-900">pvc.moe</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Portal Virtual Creator
                    </p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-xl text-gray-700 italic">
                    "Kami memahami ekosistem ini, kami tahu celahnya, dan kami
                    membangun AlterFUN untuk memperbaikinya."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY VTUBERS? (THE ASSET CLASS) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-gray-900 mb-6"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "3.5rem",
                  }}
                >
                  The Evolution of Entertainment.
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Emotional Connection */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-90"></div>
                  <div className="relative z-10 p-12 min-h-[400px] flex flex-col justify-end">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className="text-white mb-4"
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontSize: "2.25rem",
                      }}
                    >
                      Emotional Connection
                    </h3>
                    <p className="text-white/95 text-lg leading-relaxed">
                      VTuber menawarkan koneksi emosional yang tulus, jembatan
                      antara dunia maya dan nyata.
                    </p>
                  </div>
                </div>

                {/* Scalable IP */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-90"></div>
                  <div className="relative z-10 p-12 min-h-[400px] flex flex-col justify-end">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className="text-white mb-4"
                      style={{
                        fontFamily: "var(--font-accent)",
                        fontSize: "2.25rem",
                      }}
                    >
                      Scalable IP
                    </h3>
                    <p className="text-white/95 text-lg leading-relaxed">
                      Model VTuber memisahkan creator dari creation. Persona
                      digital dapat berada di mana saja, kapan saja,
                      memungkinkan skala tanpa batas fisik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "var(--font-accent)", fontSize: "3rem" }}
            >
              Ready to Join the Future?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Become part of the revolution reshaping how creators build and
              scale their dreams.
            </p>
            <button className="bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all hover:shadow-2xl hover:shadow-white/50">
              Explore the Platform
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
