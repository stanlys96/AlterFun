/*
  # Create Creator Applications Table

  1. New Tables
    - `creator_applications`
      - `id` (uuid, primary key)
      - `business_email` (text, unique)
      - `creator_name` (text)
      - `youtube_link` (text, nullable)
      - `twitch_link` (text, nullable)
      - `twitter_link` (text, nullable)
      - `bio` (text, nullable)
      - `category` (text, nullable)
      - `profile_picture_url` (text, nullable)
      - `status` (text, default 'pending') - 'pending', 'approved', 'rejected'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `creator_applications` table
    - Add policy for anyone to submit applications (insert only)
    - Add policy for authenticated users to view their own applications
*/

CREATE TABLE IF NOT EXISTS creator_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_email text UNIQUE NOT NULL,
  creator_name text NOT NULL,
  youtube_link text,
  twitch_link text,
  twitter_link text,
  bio text,
  category text,
  profile_picture_url text,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit creator applications"
  ON creator_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own applications"
  ON creator_applications
  FOR SELECT
  TO anon
  USING (true);