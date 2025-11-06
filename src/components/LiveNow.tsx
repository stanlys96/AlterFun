import { Eye, Play } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type LiveNowProps = {
  onCreatorClick?: (creatorName: string) => void;
};

export function LiveNow({ onCreatorClick }: LiveNowProps) {
  // 🔴 MOCK DATA - Replace with live streams from database
  const streams = [
    {
      id: 1,
      title: "Special Creator Event",
      creator: "MikoLive",
      viewers: 1234,
    },
    {
      id: 2,
      title: "Gaming Session with Fans",
      creator: "NyxStreams",
      viewers: 856,
    },
    {
      id: 3,
      title: "Cooking Stream - Making Ramen",
      creator: "ChefKawaiiVT",
      viewers: 642,
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 font-bold">Live Now</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="aspect-video bg-gradient-to-br from-pink-500 to-[#7E34FF] rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => onCreatorClick && onCreatorClick(stream.creator)}
            >
              {/* LIVE Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>

              {/* Viewers Count */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 z-10">
                <Eye className="w-3 h-3" />
                {stream.viewers.toLocaleString()}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play
                    className="w-6 h-6 text-white ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Stream Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="text-sm opacity-90">{stream.creator}</p>
                <h4 className="line-clamp-1">{stream.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
