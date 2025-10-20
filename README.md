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

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alterfun
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

4. Run database migrations:

The project includes Supabase migrations in `supabase/migrations/`. Apply them to your Supabase project.

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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
