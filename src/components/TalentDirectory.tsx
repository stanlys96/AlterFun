import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Circle, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Talent {
  id: number;
  name: string;
  image: string;
  isLive: boolean;
  chapter: string;
  generation: string;
}

const talents: Talent[] = [
  {
    id: 1,
    name: "Auremiya",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: true,
    chapter: "Chapter 2: Nexus",
    generation: "Gen 1",
  },
  {
    id: 2,
    name: "Lunaria",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: false,
    chapter: "Chapter 1: Origins",
    generation: "Gen 1",
  },
  {
    id: 3,
    name: "Stellara",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: true,
    chapter: "Chapter 3: Ascension",
    generation: "Gen 2",
  },
  {
    id: 4,
    name: "Kaida",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: false,
    chapter: "Chapter 2: Nexus",
    generation: "Gen 2",
  },
  {
    id: 5,
    name: "Yuki",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: true,
    chapter: "Chapter 1: Origins",
    generation: "Gen 1",
  },
  {
    id: 6,
    name: "Aria",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: false,
    chapter: "Chapter 3: Ascension",
    generation: "Gen 2",
  },
];

interface TalentDirectoryProps {
  onSelectTalent: (talent: Talent) => void;
}

export function TalentDirectory({ onSelectTalent }: TalentDirectoryProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | "live">("all");
  const [filterGen, setFilterGen] = useState<"all" | "Gen 1" | "Gen 2">("all");

  const filteredTalents = talents.filter((talent) => {
    if (filterStatus === "live" && !talent.isLive) return false;
    if (filterGen !== "all" && talent.generation !== filterGen) return false;
    return true;
  });

  return (
    <section className="py-32 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "3.5rem",
              lineHeight: "1.2",
            }}
          >
            Our Talents
          </h1>
          <p className="text-xl text-gray-700">
            Discover and support your favorite creators
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-semibold">Filters:</span>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "live")
              }
              className="appearance-none bg-white border-2 border-purple-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-semibold hover:border-purple-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="live">Live Now</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
          </div>

          {/* Generation Filter */}
          <div className="relative">
            <select
              value={filterGen}
              onChange={(e) =>
                setFilterGen(e.target.value as "all" | "Gen 1" | "Gen 2")
              }
              className="appearance-none bg-white border-2 border-purple-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-semibold hover:border-purple-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Generations</option>
              <option value="Gen 1">Gen 1</option>
              <option value="Gen 2">Gen 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
          </div>

          <div className="ml-auto text-sm text-gray-600">
            {filteredTalents.length} talent
            {filteredTalents.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              onClick={() => onSelectTalent(talent)}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Live Indicator */}
                {talent.isLive && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Circle className="w-2.5 h-2.5 fill-white animate-pulse" />
                    <span className="text-sm font-bold">LIVE</span>
                  </div>
                )}

                {/* Chapter Tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-md border border-purple-200 rounded-xl px-3 py-2 shadow-lg">
                    <div className="text-xs text-purple-600 font-semibold">
                      {talent.chapter}
                    </div>
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="text-gray-900 text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {talent.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {talent.generation}
                  </span>
                  <span className="text-sm text-purple-600 font-semibold group-hover:text-purple-700">
                    View Profile →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
