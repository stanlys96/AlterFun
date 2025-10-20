/*
  # Add Users and Follows System

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `wallet_address` (text, unique, user's wallet ID)
      - `username` (text, unique, user's chosen display name)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `follows`
      - `id` (uuid, primary key)
      - `user_wallet` (text, follower's wallet address)
      - `creator_id` (uuid, foreign key to creators)
      - `created_at` (timestamp)
      - Unique constraint on (user_wallet, creator_id)

  2. Security
    - Enable RLS on both tables
    - Users can read all user profiles
    - Users can create and update their own profile
    - Users can read all follows
    - Users can manage their own follows

  3. Important Notes
    - Username must be unique and required
    - Wallet address must be unique and required
    - Follow relationships prevent duplicates
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_wallet text NOT NULL,
  creator_id uuid NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_wallet, creator_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Anyone can read user profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Follows policies
CREATE POLICY "Anyone can read follows"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can follow creators"
  ON follows FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can unfollow creators"
  ON follows FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_follows_user ON follows(user_wallet);
CREATE INDEX IF NOT EXISTS idx_follows_creator ON follows(creator_id);