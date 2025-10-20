# AlterFUN

A Web3 platform for virtual streamers and content creators to connect with their communities through Creator Keys - a unique way for fans to support and engage with their favorite creators.

## Features

- **Creator Profiles**: Discover and follow your favorite virtual streamers and content creators
- **Creator Keys**: Support creators by purchasing their unique Creator Keys
- **Live Streaming**: Watch live streams from creators in real-time
- **Portfolio Management**: Track your Creator Key investments and portfolio performance
- **Social Integration**: Connect YouTube, Twitch, and Twitter accounts
- **Creator Applications**: Apply to become a verified creator on the platform
- **Comments & Engagement**: Interact with creators and other fans

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Authentication**: Wallet-based (Web3)

## Getting Started

### Quick Start (Development Mode with Mock Data)

This project includes mock data so you can run it immediately without configuring any backend services.

1. Clone the repository:
```bash
git clone <repository-url>
cd alterfun
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**The app will automatically use mock data** when Supabase credentials are not configured. You'll see sample creators, live streams, and other content to explore the UI and features.

### Setting Up the Real Backend (Production)

When you're ready to connect to a real database and enable full functionality:

#### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- YouTube API key (optional, for video features)

#### Steps

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Wait for the project to finish setting up

2. **Get Your Credentials**
   - In your Supabase project dashboard, go to Settings → API
   - Copy your project URL and anon/public API key

3. **Apply Database Migrations**
   - In your Supabase dashboard, go to the SQL Editor
   - Run each migration file from `supabase/migrations/` in order:
     - `20251020051354_create_alterfun_schema.sql`
     - `20251020060135_add_social_and_youtube_fields.sql`
     - `20251020070248_add_comments_and_user_keys.sql`
     - `20251020071411_add_users_and_follows.sql`
     - `20251020083333_create_creator_applications.sql`

4. **Configure Environment Variables**

   Update the `.env` file in the root directory with your real credentials:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

   **Important**: Once you add real Supabase credentials, the app will automatically switch from mock data to the real database.

5. **Get YouTube API Key (Optional)**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)
   - Add the key to your `.env` file

6. **Restart the Development Server**
   ```bash
   npm run dev
   ```

   The app will now connect to your Supabase database instead of using mock data.

### How the Mock Data System Works

The project automatically detects whether real backend credentials are configured:

- **Mock Mode**: If `VITE_SUPABASE_URL` is not set or equals `your_supabase_url`, the app uses mock data from `src/data/mockData.ts`
- **Production Mode**: If valid Supabase credentials are provided, the app connects to your real database

You can check which mode is active by looking at `src/config.ts`. The system is seamless - no code changes needed to switch between modes.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
alterfun/
├── src/
│   ├── components/        # React components
│   │   ├── Apply.tsx      # Creator application form
│   │   ├── Header.tsx     # Navigation header
│   │   ├── HeroBanner.tsx # Hero section
│   │   ├── LiveStreaming.tsx # Live streams display
│   │   ├── CreatorProfile.tsx # Creator profile pages
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── WalletContext.tsx # Web3 wallet integration
│   ├── lib/               # Utilities and configurations
│   │   ├── supabase.ts    # Supabase client
│   │   └── youtube.ts     # YouTube API integration
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── supabase/
│   └── migrations/        # Database migrations
├── public/                # Static assets
└── package.json
```

## Database Architecture

### Overview

AlterFUN uses Supabase (PostgreSQL) as its primary database. The database is designed to support creator profiles, user engagement, trading mechanics, and social features. All tables are protected by Row Level Security (RLS) policies to ensure data integrity and proper access control.

### Database Schema

#### Core Tables

##### 1. `creators` - Creator Profiles
Stores all information about content creators on the platform.

**Columns:**
- `id` (uuid, PK) - Unique creator identifier
- `name` (text, unique) - Display name
- `slug` (text, unique) - URL-friendly identifier
- `avatar_url` (text) - Profile picture URL
- `bio` (text) - Creator biography
- `subscribers` (integer) - Total subscriber count
- `total_views` (integer) - Cumulative view count
- `total_contents` (integer) - Total content pieces
- `total_videos` (integer) - Video count
- `total_shorts` (integer) - Shorts count
- `total_livestreams` (integer) - Livestream count
- `total_likes` (integer) - Total likes received
- `all_content_duration_hours` (numeric) - Total content duration
- `avg_live_duration_hours` (numeric) - Average livestream length
- `most_active_time` (text) - Peak activity time
- `key_price` (numeric) - Current Creator Key price
- `market_cap` (numeric) - Total market capitalization
- `holder_count` (integer) - Number of key holders
- `price_change_24h` (numeric) - 24-hour price change percentage
- `volume_24h` (numeric) - 24-hour trading volume
- `listing_date` (timestamptz) - Initial listing date
- `youtube_channel_id` (text) - YouTube channel ID
- `youtube_handle` (text) - YouTube @handle
- `twitter_url` (text) - Twitter/X profile
- `instagram_url` (text) - Instagram profile
- `tiktok_url` (text) - TikTok profile
- `facebook_url` (text) - Facebook page
- `linkedin_url` (text) - LinkedIn profile
- `created_at` (timestamptz) - Record creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Indexes:**
- `idx_creators_slug` - Fast lookup by slug
- `idx_creators_key_price` - Trading queries
- `idx_creators_market_cap` - Market ranking
- `idx_creators_holder_count` - Holder statistics
- `idx_creators_price_change` - Trending calculations

**RLS Policies:**
- Public read access for all users (anon + authenticated)

---

##### 2. `creator_stats_history` - Historical Creator Statistics
Tracks daily snapshots of creator metrics for charting and analytics.

**Columns:**
- `id` (uuid, PK) - Unique record identifier
- `creator_id` (uuid, FK → creators) - References creator
- `date` (date) - Snapshot date
- `subscribers` (integer) - Subscriber count at date
- `views` (integer) - View count at date
- `content_count` (integer) - Content count at date
- `created_at` (timestamptz) - Record creation timestamp

**Constraints:**
- UNIQUE(creator_id, date) - One snapshot per creator per day

**RLS Policies:**
- Public read access for all users

---

##### 3. `creator_videos` - YouTube Video Integration
Stores videos fetched from creators' YouTube channels.

**Columns:**
- `id` (uuid, PK) - Unique record identifier
- `creator_id` (uuid, FK → creators) - References creator
- `video_id` (text, unique) - YouTube video ID
- `title` (text) - Video title
- `description` (text) - Video description
- `thumbnail_url` (text) - Thumbnail image URL
- `duration` (text) - ISO 8601 duration format
- `view_count` (bigint) - Video view count
- `like_count` (integer) - Video like count
- `published_at` (timestamptz) - Original publish date
- `created_at` (timestamptz) - Record creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Indexes:**
- `idx_creator_videos_creator_id` - Filter by creator
- `idx_creator_videos_published_at` - Sort by date
- `idx_creator_videos_video_id` - Fast video lookup

**RLS Policies:**
- Public read access for all users

---

##### 4. `perks` - Creator Key Holder Benefits
Defines special perks available to key holders based on holdings.

**Columns:**
- `id` (uuid, PK) - Unique perk identifier
- `creator_id` (uuid, FK → creators) - References creator
- `title` (text) - Perk title
- `description` (text) - Perk description
- `requirement_keys` (integer) - Minimum keys required
- `status` (text) - 'active' or 'expired'
- `created_at` (timestamptz) - Record creation timestamp

**RLS Policies:**
- Public read access for all users

---

##### 5. `users` - User Profiles
Stores user account information and wallet addresses.

**Columns:**
- `id` (uuid, PK) - Unique user identifier
- `wallet_address` (text, unique) - Web3 wallet address
- `username` (text, unique) - User's chosen display name
- `created_at` (timestamptz) - Account creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Indexes:**
- `idx_users_wallet` - Fast wallet lookup
- `idx_users_username` - Username search

**RLS Policies:**
- Public read access to all profiles
- Users can create their own profile
- Users can update their own profile

---

##### 6. `follows` - Creator Follow Relationships
Tracks which users follow which creators.

**Columns:**
- `id` (uuid, PK) - Unique follow identifier
- `user_wallet` (text) - Follower's wallet address
- `creator_id` (uuid, FK → creators) - Followed creator
- `created_at` (timestamptz) - Follow timestamp

**Constraints:**
- UNIQUE(user_wallet, creator_id) - Prevent duplicate follows

**Indexes:**
- `idx_follows_user` - User's following list
- `idx_follows_creator` - Creator's follower count

**RLS Policies:**
- Public read access
- Authenticated users can follow creators
- Users can unfollow creators

---

##### 7. `user_holdings` - Creator Key Holdings
Tracks user ownership of Creator Keys.

**Columns:**
- `id` (uuid, PK) - Unique holding identifier
- `wallet_address` (text) - Key holder's wallet
- `creator_id` (uuid, FK → creators) - References creator
- `keys_held` (numeric) - Number of keys owned
- `avg_buy_price` (numeric) - Average purchase price
- `created_at` (timestamptz) - Initial purchase timestamp
- `updated_at` (timestamptz) - Last transaction timestamp

**Constraints:**
- UNIQUE(wallet_address, creator_id) - One record per user per creator

**Indexes:**
- `idx_user_holdings_wallet` - User portfolio queries

**RLS Policies:**
- Public read access (for leaderboards)
- Authenticated users can insert holdings
- Authenticated users can update their holdings

---

##### 8. `user_keys` - Simplified Key Tracking
Alternative key tracking system for portfolio features.

**Columns:**
- `id` (uuid, PK) - Unique record identifier
- `user_id` (text) - User identifier
- `creator_id` (uuid, FK → creators) - References creator
- `keys_held` (integer) - Number of keys owned
- `updated_at` (timestamptz) - Last update timestamp

**Constraints:**
- UNIQUE(user_id, creator_id) - One record per user per creator

**Indexes:**
- `idx_user_keys_user_creator` - Fast portfolio lookups

**RLS Policies:**
- Public read access
- Users can insert/update their own holdings

---

##### 9. `user_perk_claims` - Perk Redemption Tracking
Tracks which users have claimed which perks.

**Columns:**
- `id` (uuid, PK) - Unique claim identifier
- `wallet_address` (text) - Claimer's wallet
- `perk_id` (uuid, FK → perks) - Claimed perk
- `claimed_at` (timestamptz) - Claim timestamp
- `status` (text) - 'claimed' or 'redeemed'

**Constraints:**
- UNIQUE(wallet_address, perk_id) - One claim per user per perk

**Indexes:**
- `idx_user_perk_claims_wallet` - User's claimed perks

**RLS Policies:**
- Public read access
- Authenticated users can create claims

---

##### 10. `comments` - User Comments
Stores comments left by users on creator profiles.

**Columns:**
- `id` (uuid, PK) - Unique comment identifier
- `creator_id` (uuid, FK → creators) - Target creator
- `user_id` (text) - Commenter identifier
- `user_name` (text) - Display name at time of comment
- `content` (text) - Comment text
- `created_at` (timestamptz) - Comment timestamp

**Indexes:**
- `idx_comments_creator_id` - Filter by creator
- `idx_comments_created_at` - Sort by date (DESC)

**RLS Policies:**
- Public read access
- Authenticated users can create comments
- Users can update their own comments
- Users can delete their own comments

---

##### 11. `creator_applications` - Creator Onboarding
Stores applications from users wanting to become verified creators.

**Columns:**
- `id` (uuid, PK) - Unique application identifier
- `business_email` (text, unique) - Contact email
- `creator_name` (text) - Applicant's creator name
- `youtube_link` (text) - YouTube channel URL
- `twitch_link` (text) - Twitch channel URL
- `twitter_link` (text) - Twitter profile URL
- `bio` (text) - Creator biography
- `category` (text) - Content category
- `profile_picture_url` (text) - Avatar URL
- `status` (text) - 'pending', 'approved', or 'rejected'
- `created_at` (timestamptz) - Application submission timestamp
- `updated_at` (timestamptz) - Last status update timestamp

**RLS Policies:**
- Anonymous users can submit applications (INSERT)
- Anonymous users can view applications (SELECT)

---

### How to Connect to Supabase

#### Step 1: Create a Supabase Project

1. Visit [supabase.com](https://supabase.com) and sign up for a free account
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Your project name (e.g., "alterfun-production")
   - **Database Password**: Generate a strong password (save it securely)
   - **Region**: Choose the region closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for the project to provision

#### Step 2: Get Your Connection Credentials

1. In your Supabase project dashboard, navigate to **Settings** (gear icon) → **API**
2. You'll see two important values:

   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT token)

3. Copy both values

#### Step 3: Apply Database Migrations

Run the migrations in order to create your database schema:

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open each migration file from the `supabase/migrations/` folder and run them **in this exact order**:

   **Migration 1:** `20251020051354_create_alterfun_schema.sql`
   - Creates: `creators`, `creator_stats_history`, `perks`, `user_holdings`, `user_perk_claims`
   - Sets up RLS policies for core tables

   **Migration 2:** `20251020060135_add_social_and_youtube_fields.sql`
   - Adds social media fields to `creators`
   - Creates: `creator_videos`

   **Migration 3:** `20251020070248_add_comments_and_user_keys.sql`
   - Creates: `comments`, `user_keys`

   **Migration 4:** `20251020071411_add_users_and_follows.sql`
   - Creates: `users`, `follows`

   **Migration 5:** `20251020083333_create_creator_applications.sql`
   - Creates: `creator_applications`

4. Copy the entire contents of each file into the SQL Editor
5. Click **Run** to execute
6. Verify success (you should see "Success. No rows returned")
7. Repeat for all 5 migration files

#### Step 4: Configure Environment Variables

**IMPORTANT: This is the ONLY file you need to modify to connect your database!**

Open the `.env` file in the **root directory** of your project and update these two lines:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_actual_key_here
```

Replace:
- `https://xxxxxxxxxxxxx.supabase.co` with your **Project URL** from Step 2
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_actual_key_here` with your **anon/public key** from Step 2

**File location:** `/project-root/.env`

**Full example:**
```env
VITE_SUPABASE_URL=https://jlkjcndeybcsrlxspkue.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa2pjbmRleWJjc3JseHNwa3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MzUzNDMsImV4cCI6MjA3NjUxMTM0M30.VzlOj4O3u51K0zapHEnOUKF2hZiyTCal19i8PSw-Xm8
VITE_YOUTUBE_API_KEY=
```

#### Step 5: Verify the Connection

The application automatically detects your Supabase credentials:

1. Save the `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. The app will now connect to your Supabase database instead of using mock data

**How it works:**
- The file `src/config.ts` checks if `VITE_SUPABASE_URL` is set
- The file `src/lib/supabase.ts` creates the Supabase client using your credentials
- No other code changes are needed!

#### Optional: YouTube API Integration

To enable YouTube video features:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **API Key**
6. Copy the API key
7. Add it to your `.env` file:
   ```env
   VITE_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### Connection Architecture

```
┌─────────────────────┐
│   React Frontend    │
│   (Browser)         │
└──────────┬──────────┘
           │ Reads from
           ↓
┌─────────────────────┐
│   .env file         │
│ - VITE_SUPABASE_URL │
│ - VITE_SUPABASE_    │
│   ANON_KEY          │
└──────────┬──────────┘
           │ Used by
           ↓
┌─────────────────────┐
│  src/config.ts      │
│  Detects if mock    │
│  or real mode       │
└──────────┬──────────┘
           │ Configures
           ↓
┌─────────────────────┐
│ src/lib/supabase.ts │
│ Creates Supabase    │
│ client instance     │
└──────────┬──────────┘
           │ Connects to
           ↓
┌─────────────────────┐
│  Supabase Cloud     │
│  PostgreSQL DB      │
│  with RLS enabled   │
└─────────────────────┘
```

### Security Best Practices

1. **NEVER commit real credentials to git**
   - The `.env` file is in `.gitignore`
   - Use environment variables in production

2. **Use the anon/public key only**
   - The service role key bypasses RLS
   - Never expose service role key in frontend code

3. **Row Level Security (RLS) is enabled on all tables**
   - Database enforces access control
   - Policies define who can read/write data

4. **All sensitive operations require authentication**
   - Comments, follows, and holdings require auth
   - Creator data is publicly readable

### Troubleshooting

**Problem: "Failed to fetch" or connection errors**
- Verify your `.env` file has the correct URL and key
- Check that you restarted the dev server after changing `.env`
- Ensure your Supabase project is active (not paused)

**Problem: "relation does not exist" errors**
- Verify all 5 migrations were run successfully
- Check the order of migrations (must be chronological)
- Go to **Database** → **Tables** in Supabase to verify tables exist

**Problem: App still shows mock data**
- Check that `VITE_SUPABASE_URL` is not set to `"your_supabase_url"`
- Verify no typos in environment variable names
- Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)

**Problem: "new row violates row-level security policy"**
- User must be authenticated for write operations
- Check RLS policies in **Authentication** → **Policies**
- Verify JWT token is being sent with requests

## Features in Detail

### Creator Keys

Creator Keys are unique tokens that represent support for a creator. Key features include:
- Dynamic pricing based on supply and demand
- Portfolio tracking and performance metrics
- Trading history and charts

### Live Streaming

Real-time display of active streams from verified creators with:
- Live viewer counts
- Stream thumbnails and titles
- Category filtering

### Creator Applications

A comprehensive application process for new creators including:
- Contact information collection
- Social media verification
- Profile setup with bio and avatar
- Manual review process by the AlterFUN team

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
