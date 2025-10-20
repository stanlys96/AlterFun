import { supabase, CreatorVideo } from './supabase';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CACHE_DURATION = 1000 * 60 * 15;

type YouTubeVideo = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
};

export async function fetchAndCacheVideos(creatorId: string, channelId: string): Promise<CreatorVideo[]> {
  try {
    const { data: cachedVideos, error: cacheError } = await supabase
      .from('creator_videos')
      .select('*')
      .eq('creator_id', creatorId)
      .order('published_at', { ascending: false });

    if (cacheError) {
      console.error('Cache fetch error:', cacheError);
    }

    const now = new Date();
    const cacheValid = cachedVideos && cachedVideos.length > 0 && cachedVideos[0].updated_at;
    const lastUpdate = cacheValid ? new Date(cachedVideos[0].updated_at) : null;

    if (lastUpdate && (now.getTime() - lastUpdate.getTime()) < CACHE_DURATION) {
      return cachedVideos;
    }

    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API key not configured');
      return cachedVideos || [];
    }

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=50&type=video`
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 403 || searchResponse.status === 429) {
        console.warn('YouTube API rate limit reached, using cached data');
        return cachedVideos || [];
      }
      throw new Error(`YouTube API search error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: { id: { videoId: string } }) => item.id.videoId).join(',');

    if (!videoIds) {
      return cachedVideos || [];
    }

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`
    );

    if (!videosResponse.ok) {
      throw new Error(`YouTube API videos error: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();
    const videos: YouTubeVideo[] = videosData.items;

    const videoRecords = videos.map(video => ({
      creator_id: creatorId,
      video_id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail_url: video.snippet.thumbnails.medium.url,
      duration: video.contentDetails.duration,
      view_count: parseInt(video.statistics.viewCount) || 0,
      like_count: parseInt(video.statistics.likeCount) || 0,
      published_at: video.snippet.publishedAt,
      updated_at: new Date().toISOString(),
    }));

    for (const record of videoRecords) {
      await supabase
        .from('creator_videos')
        .upsert(record, { onConflict: 'video_id' });
    }

    const { data: updatedVideos } = await supabase
      .from('creator_videos')
      .select('*')
      .eq('creator_id', creatorId)
      .order('published_at', { ascending: false });

    return updatedVideos || [];
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);

    const { data: cachedVideos } = await supabase
      .from('creator_videos')
      .select('*')
      .eq('creator_id', creatorId)
      .order('published_at', { ascending: false });

    return cachedVideos || [];
  }
}

export async function getCreatorVideos(creatorId: string): Promise<CreatorVideo[]> {
  const { data, error } = await supabase
    .from('creator_videos')
    .select('*')
    .eq('creator_id', creatorId)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching creator videos:', error);
    return [];
  }

  return data || [];
}
