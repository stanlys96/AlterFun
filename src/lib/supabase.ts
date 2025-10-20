import { createClient } from "@supabase/supabase-js";
import { createMockSupabaseClient } from "./mockSupabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createMockSupabaseClient();

export type Creator = {
  id: string;
  name: string;
  slug: string;
  avatar_url: string;
  bio: string;
  subscribers: number;
  total_views: number;
  total_contents: number;
  total_videos: number;
  total_shorts: number;
  total_livestreams: number;
  total_likes: number;
  all_content_duration_hours: number;
  avg_live_duration_hours: number;
  most_active_time: string;
  key_price: number;
  market_cap: number;
  holder_count: number;
  price_change_24h: number;
  volume_24h: number;
  listing_date: string;
  created_at: string;
  updated_at: string;
  youtube_channel_id?: string;
  youtube_handle?: string;
  twitter_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  facebook_url?: string;
  linkedin_url?: string;
};

export type Perk = {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  requirement_keys: number;
  status: string;
  created_at: string;
};

export type UserHolding = {
  id: string;
  wallet_address: string;
  creator_id: string;
  keys_held: number;
  avg_buy_price: number;
  created_at: string;
  updated_at: string;
};

export type CreatorVideo = {
  id: string;
  creator_id: string;
  video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  view_count: number;
  like_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  creator_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
};

export type UserKeys = {
  id: string;
  user_id: string;
  creator_id: string;
  keys_held: number;
  updated_at: string;
};

export type User = {
  id: string;
  wallet_address: string;
  username: string;
  created_at: string;
  updated_at: string;
};

export type Follow = {
  id: string;
  user_wallet: string;
  creator_id: string;
  created_at: string;
};
