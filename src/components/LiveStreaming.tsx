import { Radio, Eye, Users } from "lucide-react";
import { mockLiveStreams } from "../data/mockData";

type LiveStreamingProps = {
  onNavigate: (page: string, slug?: string) => void;
};

export default function LiveStreaming({ onNavigate }: LiveStreamingProps) {
  const liveStreams = mockLiveStreams.map((stream) => ({
    id: stream.id,
    slug: stream.creator.slug,
    thumbnail: stream.thumbnail,
    title: stream.title,
    streamerName: stream.creator.name,
    streamerAvatar: stream.creator.avatar_url,
    viewers: stream.viewers,
    category: stream.category,
  }));

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="w-8 h-8 text-red-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Live Streaming Now
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveStreams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => onNavigate("live-stream", stream.slug)}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover"
                />

                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>

                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg flex items-center gap-1.5 text-sm font-semibold">
                  <Eye className="w-4 h-4" />
                  {stream.viewers.toLocaleString()}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={stream.streamerAvatar}
                    alt={stream.streamerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#7E34FF] transition-colors">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {stream.streamerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {stream.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">
                      {stream.viewers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
