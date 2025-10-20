export const USE_MOCK_DATA = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_url';

export const config = {
  useMockData: USE_MOCK_DATA,
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  youtube: {
    apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
};
