/*
  # Add Social Media and YouTube Integration Fields

  1. Changes to `creators` table
    - Add `youtube_channel_id` (text) - YouTube channel ID for API integration
    - Add `youtube_handle` (text) - YouTube handle (@username)
    - Add `twitter_url` (text) - Twitter/X profile URL
    - Add `instagram_url` (text) - Instagram profile URL
    - Add `tiktok_url` (text) - TikTok profile URL
    - Add `facebook_url` (text) - Facebook page URL
    - Add `linkedin_url` (text) - LinkedIn profile URL

  2. New Tables
    - `creator_videos`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, foreign key)
      - `video_id` (text) - YouTube video ID
      - `title` (text)
      - `description` (text)
      - `thumbnail_url` (text)
      - `duration` (text) - ISO 8601 duration format
      - `view_count` (bigint)
      - `like_count` (integer)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  3. Security
    - Enable RLS on creator_videos table
    - Add policy for public read access to creator_videos
*/

-- Add social media and YouTube fields to creators table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'youtube_channel_id'
  ) THEN
    ALTER TABLE creators ADD COLUMN youtube_channel_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'youtube_handle'
  ) THEN
    ALTER TABLE creators ADD COLUMN youtube_handle text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'twitter_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN twitter_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN instagram_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'tiktok_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN tiktok_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN facebook_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'creators' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE creators ADD COLUMN linkedin_url text;
  END IF;
END $$;

-- Create creator_videos table
CREATE TABLE IF NOT EXISTS creator_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  video_id text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  thumbnail_url text,
  duration text,
  view_count bigint DEFAULT 0,
  like_count integer DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE creator_videos ENABLE ROW LEVEL SECURITY;

-- Creator videos policies (public read)
CREATE POLICY "Anyone can view creator videos"
  ON creator_videos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_creator_videos_creator_id ON creator_videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_videos_published_at ON creator_videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_creator_videos_video_id ON creator_videos(video_id);
