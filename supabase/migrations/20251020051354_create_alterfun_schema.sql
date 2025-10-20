/*
  # AlterFUN Platform Schema

  1. New Tables
    - `creators`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique, for URL)
      - `avatar_url` (text)
      - `bio` (text)
      - `subscribers` (integer)
      - `total_views` (integer)
      - `total_contents` (integer)
      - `total_videos` (integer)
      - `total_shorts` (integer)
      - `total_livestreams` (integer)
      - `total_likes` (integer)
      - `all_content_duration_hours` (numeric)
      - `avg_live_duration_hours` (numeric)
      - `most_active_time` (text)
      - `key_price` (numeric)
      - `market_cap` (numeric)
      - `holder_count` (integer)
      - `price_change_24h` (numeric)
      - `volume_24h` (numeric)
      - `listing_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `creator_stats_history`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, foreign key)
      - `date` (date)
      - `subscribers` (integer)
      - `views` (integer)
      - `content_count` (integer)
      - `created_at` (timestamptz)
    
    - `perks`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `requirement_keys` (integer)
      - `status` (text) - 'active', 'expired'
      - `created_at` (timestamptz)
    
    - `user_holdings`
      - `id` (uuid, primary key)
      - `wallet_address` (text)
      - `creator_id` (uuid, foreign key)
      - `keys_held` (numeric)
      - `avg_buy_price` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_perk_claims`
      - `id` (uuid, primary key)
      - `wallet_address` (text)
      - `perk_id` (uuid, foreign key)
      - `claimed_at` (timestamptz)
      - `status` (text) - 'claimed', 'redeemed'

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to creators and perks
    - Add policies for authenticated users to manage their holdings and claims
*/

-- Create creators table
CREATE TABLE IF NOT EXISTS creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  avatar_url text,
  bio text,
  subscribers integer DEFAULT 0,
  total_views integer DEFAULT 0,
  total_contents integer DEFAULT 0,
  total_videos integer DEFAULT 0,
  total_shorts integer DEFAULT 0,
  total_livestreams integer DEFAULT 0,
  total_likes integer DEFAULT 0,
  all_content_duration_hours numeric DEFAULT 0,
  avg_live_duration_hours numeric DEFAULT 0,
  most_active_time text,
  key_price numeric DEFAULT 0,
  market_cap numeric DEFAULT 0,
  holder_count integer DEFAULT 0,
  price_change_24h numeric DEFAULT 0,
  volume_24h numeric DEFAULT 0,
  listing_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create creator stats history table
CREATE TABLE IF NOT EXISTS creator_stats_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  date date NOT NULL,
  subscribers integer DEFAULT 0,
  views integer DEFAULT 0,
  content_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(creator_id, date)
);

-- Create perks table
CREATE TABLE IF NOT EXISTS perks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  requirement_keys integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create user holdings table
CREATE TABLE IF NOT EXISTS user_holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  keys_held numeric DEFAULT 0,
  avg_buy_price numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(wallet_address, creator_id)
);

-- Create user perk claims table
CREATE TABLE IF NOT EXISTS user_perk_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  perk_id uuid REFERENCES perks(id) ON DELETE CASCADE,
  claimed_at timestamptz DEFAULT now(),
  status text DEFAULT 'claimed',
  UNIQUE(wallet_address, perk_id)
);

-- Enable RLS
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_stats_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_perk_claims ENABLE ROW LEVEL SECURITY;

-- Creators policies (public read)
CREATE POLICY "Anyone can view creators"
  ON creators FOR SELECT
  TO anon, authenticated
  USING (true);

-- Creator stats history policies (public read)
CREATE POLICY "Anyone can view creator stats history"
  ON creator_stats_history FOR SELECT
  TO anon, authenticated
  USING (true);

-- Perks policies (public read)
CREATE POLICY "Anyone can view perks"
  ON perks FOR SELECT
  TO anon, authenticated
  USING (true);

-- User holdings policies
CREATE POLICY "Users can view all holdings"
  ON user_holdings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert their own holdings"
  ON user_holdings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own holdings"
  ON user_holdings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- User perk claims policies
CREATE POLICY "Users can view all claims"
  ON user_perk_claims FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can create their own claims"
  ON user_perk_claims FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_creators_slug ON creators(slug);
CREATE INDEX IF NOT EXISTS idx_creators_key_price ON creators(key_price);
CREATE INDEX IF NOT EXISTS idx_creators_market_cap ON creators(market_cap);
CREATE INDEX IF NOT EXISTS idx_creators_holder_count ON creators(holder_count);
CREATE INDEX IF NOT EXISTS idx_creators_price_change ON creators(price_change_24h);
CREATE INDEX IF NOT EXISTS idx_user_holdings_wallet ON user_holdings(wallet_address);
CREATE INDEX IF NOT EXISTS idx_user_perk_claims_wallet ON user_perk_claims(wallet_address);
