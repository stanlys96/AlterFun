import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, Sparkles } from "lucide-react";

const vtuberCharacter =
  "figma:asset/e2961a5ee7ad796226b86872eacd42a019078cb2.png";
const stageBackground =
  "figma:asset/6c779e7b07114a95de6f561c7bf25e51d5772ad6.png";

interface HeroProps {
  featuredTalent?: {
    name: string;
    image: string;
    chapter: string;
  };
}

export function Hero({ featuredTalent }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Trigger slide-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Default featured talent
  const talent = featuredTalent || {
    name: "Auremiya",
    image: vtuberCharacter,
    chapter: "CHAPTER 0: NEXUS",
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-32">
      {/* Stage Background */}
      <div className="absolute inset-0">
        <img
          src={stageBackground}
          alt="Stage Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>

      {/* Diagonal grid pattern - subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(-45deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Diagonal accent lines - asymmetric */}
      <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent transform -rotate-12 opacity-30"></div>
      <div className="absolute bottom-1/3 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent transform rotate-6 opacity-30"></div>

      {/* FULL-SCREEN CHARACTER - No Parallax, Only Slide-in */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -right-[5%] md:-right-[5%] top-0 bottom-0 w-[80%] md:w-[55%] flex items-start justify-end overflow-visible transition-all duration-1000 ease-out"
          style={{
            transform: `translateX(${isVisible ? "0" : "100%"})`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Character Glow */}
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent blur-3xl opacity-30"></div>

          {/* Character Image - 200% Zoom, Top Aligned */}
          <img
            src={talent.image}
            alt={talent.name}
            className="relative transition-all duration-1000"
            style={{
              height: "200%",
              width: "auto",
              objectFit: "cover",
              objectPosition: "top center",
              filter: "drop-shadow(0 20px 60px rgba(6, 182, 212, 0.6))",
            }}
          />
        </div>
      </div>

      {/* Content - Asymmetric, Diagonal, Overlapping */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full z-10">
        <div className="space-y-4 md:space-y-6 max-w-2xl">
          {/* Chapter Badge */}
          <div className="inline-block hover:scale-105 transition-transform">
            <div className="relative inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-100 to-cyan-100 border-2 border-purple-300 shadow-lg px-3 py-2 md:px-5 md:py-3 rounded-xl backdrop-blur-sm bg-white/90">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-500"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-purple-500"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500"></div>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-xs md:text-sm text-purple-900 font-bold uppercase tracking-wider">
                {talent.chapter}
              </span>
            </div>
          </div>

          {/* Featured Talent Name */}
          <div className="hover:scale-105 transition-transform">
            <h1
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 mb-4 md:mb-6 drop-shadow-sm p-2"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
              }}
            >
              {talent.name}
            </h1>

            <p className="text-base md:text-xl lg:text-2xl text-white max-w-xl leading-relaxed drop-shadow-lg">
              New chapter mission begin! Start now and earn{" "}
              <span className="text-cyan-300 font-bold">
                Auremiya Official Exclusive Merch
              </span>
              .
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
            <button className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10 flex items-center justify-center gap-2 text-base md:text-lg font-bold">
                Earn Exclusive Merch
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="text-xs text-white/80 uppercase tracking-wider font-bold drop-shadow-lg">
          Scroll
        </div>
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
      </div>

      {/* Diagonal Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
}
