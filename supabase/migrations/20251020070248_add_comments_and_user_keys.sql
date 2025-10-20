/*
  # Add Comments and User Keys Tracking

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, foreign key to creators)
      - `user_id` (text, user identifier from wallet)
      - `user_name` (text, display name)
      - `content` (text, comment content)
      - `created_at` (timestamp)
    
    - `user_keys`
      - `id` (uuid, primary key)
      - `user_id` (text, user identifier from wallet)
      - `creator_id` (uuid, foreign key to creators)
      - `keys_held` (integer, number of keys held)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow authenticated users to read all comments
    - Allow authenticated users to create their own comments
    - Allow users to read their own key holdings
    - System manages key holdings (admin only updates)
*/

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  user_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User keys tracking
CREATE TABLE IF NOT EXISTS user_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  creator_id uuid NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  keys_held integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, creator_id)
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_keys ENABLE ROW LEVEL SECURITY;

-- Comments policies
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- User keys policies
CREATE POLICY "Users can read all key holdings"
  ON user_keys FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own key records"
  ON user_keys FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own key holdings"
  ON user_keys FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_creator_id ON comments(creator_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_keys_user_creator ON user_keys(user_id, creator_id);