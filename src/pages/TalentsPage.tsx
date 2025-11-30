import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Circle, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import useSWR from "swr";

const fetcher = async (key: string) => {
  try {
    const { data, error } = await supabase.from(key).select("*, creators(*)");
    if (error) throw error;
    return data || [];
  } catch (e) {
    return [];
  }
};

export function TalentsPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<"all" | "live">("all");
  const [filterGen, setFilterGen] = useState<"all" | "Gen 1" | "Gen 2">("all");

  const { setCurrentCreatorChapter } = useAuth();

  const { data: talentsData } = useSWR("creator_chapters", fetcher);
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
            {talentsData?.length} talent
            {talentsData?.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {talentsData &&
            talentsData != null &&
            talentsData?.map((talent: any) => (
              <div
                key={talent?.id}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setCurrentCreatorChapter(talent);
                  navigate(`/talents/${talent?.id}`);
                }}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={talent?.creators?.avatar_detail_url}
                    alt={talent?.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Live Indicator */}
                  {talent?.isLive && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                      <Circle className="w-2.5 h-2.5 fill-white animate-pulse" />
                      <span className="text-sm font-bold">LIVE</span>
                    </div>
                  )}

                  {/* Chapter Tag */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md border border-purple-200 rounded-xl px-3 py-2 shadow-lg">
                      <div className="text-xs text-purple-600 font-semibold">
                        Chapter {talent?.chapter_number}: {talent?.chapter_name}
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
                    {talent?.creators?.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {talent?.description}
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
