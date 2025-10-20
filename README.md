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

## Database Schema

The application uses the following main tables:

- `creators` - Creator profiles and information
- `creator_keys` - Creator Key trading data
- `portfolios` - User portfolio holdings
- `comments` - User comments on creator profiles
- `follows` - User follow relationships
- `creator_applications` - Creator application submissions
- `users` - User accounts and wallet information

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
