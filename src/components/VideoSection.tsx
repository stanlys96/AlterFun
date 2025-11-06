import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-[#7E34FF] to-[#5C26BF] rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play
                  className="w-8 h-8 text-[#7E34FF] ml-1"
                  fill="currentColor"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm opacity-80 mb-2">Platform Introduction</p>
              <h3 className="text-2xl">Discover AlterFUN</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
