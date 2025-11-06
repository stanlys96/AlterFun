import { TrendingUp, Coins, BarChart3 } from "lucide-react";
const image_b7c83c690af7e81ee0445db9ad2a61484b5c13ed =
  "/images/b7c83c690af7e81ee0445db9ad2a61484b5c13ed.png";
const image_f5a349d502f0b2548c4daff7615fd689e006358f =
  "/images/f5a349d502f0b2548c4daff7615fd689e006358f.png";
const barChartImage = "/images/barchart.png";
const image_2faa9a4f373618932f8a7a9108b9c0d7cd310fed =
  "/images/2faa9a4f373618932f8a7a9108b9c0d7cd310fed.png";
const image_e0fc7a3bcb0e7ee9d340af0ea54cb40cd841339f =
  "/images/e0fc7a3bcb0e7ee9d340af0ea54cb40cd841339f.png";
const image_8761f9fa27a099701dcc4028a8375d1199f91dba =
  "/images/8761f9fa27a099701dcc4028a8375d1199f91dba.png";
const tokenImage = "/images/token.png";
const barIcon = "/images/2faa9a4f373618932f8a7a9108b9c0d7cd310fed.png";
const arrowIcon = "/images/e0fc7a3bcb0e7ee9d340af0ea54cb40cd841339f.png";

export function ValueProposition() {
  return (
    <section id="about" className="py-20 bg-transparent relative -mt-20">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            {/* Grow with Creators */}
            <div className="bg-gradient-to-br from-[#7E34FF] to-[#6B2DD9] rounded-3xl p-8 text-white text-center md:mb-8">
              <div className="w-30 h-30 mx-auto mb-6 flex items-center justify-center">
                <img
                  src={barChartImage}
                  alt="Bar Chart"
                  className="w-30 h-30"
                />
              </div>
              <h3 className="text-2xl mb-3 text-[24px]">
                Ride Along Their Growth
              </h3>
              <p className="text-purple-100/80 leading-relaxed text-[15px]">
                Grow together with creator token, increasing their value and
                yours.
              </p>
            </div>

            {/* Introducing Creator Token - Elevated */}
            <div className="bg-gradient-to-br from-[#7E34FF] to-[#6B2DD9] rounded-3xl p-8 pt-12 pb-10 text-white text-center relative z-10 md:-mt-8">
              <div className="w-[140px] h-[140px] mx-auto mb-6 flex items-center justify-center">
                <img
                  src={tokenImage}
                  alt="Token"
                  className="w-[140px] h-[140px] p-[0px]"
                />
              </div>
              <h3 className="text-2xl mb-2">Introducing</h3>
              <h3 className="text-2xl mb-4 font-bold text-[36px]">
                CREATOR TOKEN
              </h3>
              <p className="text-purple-100/80 leading-relaxed text-[15px]">
                Every token represent tokenized creator's IP. Invest on
                creator's growth by purchasing their creator Token.
              </p>
            </div>

            {/* Transparent and Trackable */}
            <div className="bg-gradient-to-br from-[#7E34FF] to-[#6B2DD9] rounded-3xl p-8 text-white text-center md:mb-8">
              <div className="w-30 h-30 mx-auto mb-6 flex items-center justify-center">
                <img
                  src={image_f5a349d502f0b2548c4daff7615fd689e006358f}
                  alt="Growth Arrow"
                  className="w-30 h-30"
                />
              </div>
              <h3 className="text-2xl mb-3 text-[24px]">
                Transparent and Trackable
              </h3>
              <p className="text-purple-100/80 leading-relaxed text-[15px]">
                Using Web3 platform and comprehensive creator data, we make sure
                every growth is transparent and trackable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
