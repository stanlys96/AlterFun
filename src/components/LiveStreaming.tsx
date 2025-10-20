import { Radio, Eye, Users } from 'lucide-react';

type LiveStreamingProps = {
  onNavigate: (page: string, slug?: string) => void;
};

export default function LiveStreaming({ onNavigate }: LiveStreamingProps) {
  const liveStreams = [
    {
      id: 1,
      slug: 'sakura-chan',
      thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Late Night Gaming Session - Come hang out!',
      streamerName: 'SakuraChan',
      streamerAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200',
      viewers: 1234,
      category: 'Gaming',
    },
    {
      id: 2,
      slug: 'neon-beats',
      thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Music Production Stream - Making Beats Live',
      streamerName: 'NeonBeats',
      streamerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      viewers: 856,
      category: 'Music',
    },
    {
      id: 3,
      slug: 'art-master',
      thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Digital Art Tutorial - Character Design',
      streamerName: 'ArtMaster',
      streamerAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      viewers: 672,
      category: 'Art',
    },
    {
      id: 4,
      slug: 'tech-guru',
      thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Building a Web App from Scratch',
      streamerName: 'TechGuru',
      streamerAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      viewers: 543,
      category: 'Tech',
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="w-8 h-8 text-red-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Live Streaming Now</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveStreams.map((stream) => (
            <div
              key={stream.id}
              onClick={() => onNavigate('creator', stream.slug)}
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
                    <span className="font-semibold">{stream.viewers.toLocaleString()}</span>
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
