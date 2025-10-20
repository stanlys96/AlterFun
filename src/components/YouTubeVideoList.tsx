import { useState, useEffect } from 'react';
import { Eye, ThumbsUp, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';

type Video = {
  id: string;
  video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  view_count: number;
  like_count: number;
  published_at: string | null;
};

type YouTubeVideoListProps = {
  creatorId: string;
  videos: Video[];
  isLoading: boolean;
  error: string | null;
};

function formatDuration(isoDuration: string | null): string {
  if (!isoDuration) return '';

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

const placeholderVideos: Video[] = [
  {
    id: 'placeholder-1',
    video_id: 'dQw4w9WgXcQ',
    title: 'Sample Video: Getting Started with Content Creation',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT10M30S',
    view_count: 125000,
    like_count: 3200,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-2',
    video_id: 'dQw4w9WgXcQ',
    title: 'Behind the Scenes: My Creative Process',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT15M45S',
    view_count: 89000,
    like_count: 2100,
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-3',
    video_id: 'dQw4w9WgXcQ',
    title: 'Live Stream Highlights: Epic Moments Compilation',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT8M20S',
    view_count: 210000,
    like_count: 5400,
    published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-4',
    video_id: 'dQw4w9WgXcQ',
    title: 'Q&A Session: Answering Your Questions',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT12M10S',
    view_count: 67000,
    like_count: 1800,
    published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-5',
    video_id: 'dQw4w9WgXcQ',
    title: 'Special Announcement: Exciting News!',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/3052360/pexels-photo-3052360.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT5M30S',
    view_count: 156000,
    like_count: 4200,
    published_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-6',
    video_id: 'dQw4w9WgXcQ',
    title: 'Tutorial: Tips and Tricks for Beginners',
    description: 'This is a placeholder video',
    thumbnail_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=640',
    duration: 'PT18M40S',
    view_count: 98000,
    like_count: 2700,
    published_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function YouTubeVideoList({ videos, isLoading, error }: YouTubeVideoListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 6;

  const displayVideos = videos.length > 0 ? videos : placeholderVideos;
  const totalPages = Math.ceil(displayVideos.length / videosPerPage);

  const currentVideos = displayVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading videos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-12">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Showing placeholder videos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Latest Videos</h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentVideos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div className="relative aspect-video bg-gray-200">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              )}
            </div>

            <div className="p-3">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h4>

              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{formatViewCount(video.view_count)} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{formatViewCount(video.like_count)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(video.published_at)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
