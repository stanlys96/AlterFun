import { useEffect, useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Eye,
  Video,
  Clock,
  Calendar,
  Heart,
  BarChart3,
  MessageSquare,
  Send,
  Youtube,
  Twitch,
  Globe,
  UserPlus,
  UserCheck,
  Target,
  Lock,
  CheckCircle2,
  Trophy,
  Gift,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Separator } from "../components/ui/separator";
import { useLocation } from "react-router-dom";
import { Creator, CreatorVideo, Perk, supabase } from "../lib/supabase";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchAndCacheVideos } from "../lib/youtube";
import { Comments } from "../components";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchDexScreenerData,
  fetchTokenData,
} from "../services/tokenDataService";
import { useLaunchedTokens } from "../hooks/useLaunchedTokens";
import { useSearchParams } from "next/navigation";
import ChartContainer from "../components/ChartContainer";
import { XIcon } from "../components/icons";

// 🔴 MOCK ASSETS - Replace with database URLs
// TODO: Store these image URLs in database and fetch based on creator ID
const characterArt = "/images/11300db999a790ecb9c5a97893bea6d702bf81e8.png";
const characterBanner = "/images/2a5ac5b4a8c0ee8a22cd0d2b266354577118ce50.png";
const tradingChart = "/images/54e2a4c44dfcbb0161079346ad87ca8cadae33e2.png";
const image_fb0f00bcf8c51620020e4db0c8bb0206986ff5f9 =
  "/images/fb0f00bcf8c51620020e4db0c8bb0206986ff5f9.png";

type CreatorDetailPageProps = {
  onFollowClick: () => void;
  onBack: () => void;
};

interface TokenData {
  address: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  price: number;
  priceChange: { percentage: number; period: string };
  marketCap: number;
  volume24h: number;
  holders: number;
  poolAddress?: string;
  tradeStatus: "active" | "graduated";
  metadataUri?: string;
}

export const CreatorDetailPage = ({
  onFollowClick,
  onBack,
}: CreatorDetailPageProps) => {
  const { tokens } = useLaunchedTokens();
  const searchParams = useSearchParams();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const currentCreator = location?.pathname?.split("/")[2];
  const { publicKey } = useWallet();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [perks, setPerks] = useState<Perk[]>([]);
  const [amount, setAmount] = useState("");
  const [statsTab, setStatsTab] = useState<"7d" | "30d">("7d");
  const [videos, setVideos] = useState<CreatorVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState<string | null>(null);
  const [userKeys, setUserKeys] = useState<number>(0);
  const [showMobileTradeKeys, setShowMobileTradeKeys] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  // ✅ FRONTEND STATE - These are fine, no backend needed
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // 🔴 MOCK DATA - REPLACE WITH DATABASE FETCH
  // TODO: Fetch creator data from database using creatorName parameter
  // Example: const { data: creatorData } = useQuery(['creator', creatorName], fetchCreatorByName);
  const creatorData = {
    // Basic Profile Info - Database Table: creators
    name: "Melista Inori", // DB field: name
    subtitle: "V-Nurse [W Studio]", // DB field: subtitle
    type: "Cat Vtuber", // DB field: creator_type
    avatar: "anime creator vtuber", // DB field: avatar_url

    // Token/Trading Data - Fetch from Solana blockchain OR database cache
    tokenPrice: 2.45, // Real-time from Solana or DB field: token_price
    change24h: 15.3, // Calculate or DB field: price_change_24h
    marketCap: 1245000, // Calculate or DB field: market_cap
    volume24h: 89000, // DB field: volume_24h
    holders: 1240, // Count from blockchain or DB field: holder_count

    // Live Stream Status - Real-time API or WebSocket
    isLive: true, // DB field: is_live or real-time API
    liveViewers: 234, // Real-time streaming API

    // Creator Stats - Database Table: creator_stats
    subscribers: 4600, // DB field: subscriber_count
    totalContent: 702, // DB field: total_content
    totalViews: 223100, // DB field: total_views

    // Social Media Links - Database Table: creator_socials
    socials: {
      youtube: "https://youtube.com/@melista", // DB field: youtube_url
      twitch: "https://twitch.tv/melista", // DB field: twitch_url
      twitter: "https://twitter.com/melista", // DB field: twitter_url
      discord: "https://discord.gg/melista", // DB field: discord_url
      tiktok: "https://tiktok.com/@melista", // DB field: tiktok_url
      instagram: "https://instagram.com/melista", // DB field: instagram_url
    },

    // Content Statistics - Database Table: creator_content_stats
    contentStats: {
      totalVideos: 17, // DB field: total_videos
      totalShorts: 88, // DB field: total_shorts
      totalLivestreams: 597, // DB field: total_livestreams
      totalLikes: 29600, // DB field: total_likes
      totalDuration: 2618, // DB field: total_duration_hours
      longestContent: "15:59:41", // DB field: longest_content_duration
      shortestContent: "00:00:04", // DB field: shortest_content_duration
      livestreamRatio: 81.7, // Calculate: (totalLivestreams/totalContent)*100
      avgLiveDuration: 11, // DB field: avg_live_duration_hours
    },

    // Growth Metrics - Database Table: creator_growth
    growth: {
      subscriberCount: 4570, // DB field: latest_subscriber_count
      subscriberChange: 0.88, // Calculate: percentage change from previous day
      viewCount: 223143, // DB field: latest_view_count
      viewChange: 1.02, // Calculate: percentage change from previous day
    },

    // Personal Information - Database Table: creator_profile
    personal: {
      gender: "Female", // DB field: gender
      height: 150, // DB field: height_cm
      weight: 45, // DB field: weight_kg
      language: "Indonesian", // DB field: language
      modelType: "Live2D, PNG", // DB field: model_type
      birthDate: "March 07", // DB field: birth_date
      zodiac: "Pisces", // DB field: zodiac_sign
      debutDate: "September 03, 2024", // DB field: debut_date
      nickname: "Melista, Melis", // DB field: nickname
      activeTime: "Afternoon", // DB field: active_time
    },

    // Preferences - Database Table: creator_preferences (JSON fields or separate tables)
    preferences: {
      likes: ["Fried chicken", "Sweet food", "Sweet drinks"], // DB field: likes_json
      dislikes: ["Empty promises", "Lies", "Cheating", "Exaggerations"], // DB field: dislikes_json
      hobbies: ["RPG games", "Cosplay", "Gaming"], // DB field: hobbies_json
    },

    // Additional Info - Database Table: creators
    about:
      "Cat-themed VTuber from WStudio, with a personality that enjoys free talk, cosplay, and gaming", // DB field: about_text
    nameMeaning: "Surrender and Pray", // DB field: name_meaning
    registeredDate: "December 31, 2024", // DB field: registered_date

    // Goals - Database Table: creator_goals
    goals: [
      {
        id: 1, // DB field: goal_id
        title: "First Cover Song Release", // DB field: goal_title
        creatorGoal:
          "Record and produce an original cover of a popular anime song with professional mixing", // DB field: creator_goal
        holderReward:
          "Early access to the cover song 48 hours before public release + exclusive behind-the-scenes recording footage", // DB field: holder_reward
        milestoneMarketCap: 500000, // DB field: milestone_market_cap
        isUnlocked: true, // Calculate: creatorData.marketCap >= milestoneMarketCap
        unlockedDate: "January 15, 2025", // DB field: unlocked_date
      },
      {
        id: 2,
        title: "Custom Digital Cookbook",
        creatorGoal:
          "Create and publish a 50+ page digital cookbook featuring my favorite recipes from cooking streams",
        holderReward:
          "Free digital cookbook download + exclusive bonus recipes not available anywhere else",
        milestoneMarketCap: 1000000,
        isUnlocked: true,
        unlockedDate: "February 2, 2025",
      },
      {
        id: 3,
        title: "3D Model Debut Stream",
        creatorGoal:
          "Commission a full 3D model and host a special debut stream with interactive elements",
        holderReward:
          "Voting rights on 3D model outfit designs + commemorative NFT badge for debut stream attendees",
        milestoneMarketCap: 2000000,
        isUnlocked: false,
        unlockedDate: null,
      },
      {
        id: 4,
        title: "Limited Edition Merch Collection",
        creatorGoal:
          "Design and launch exclusive merchandise line including acrylic stands, apparel, and stickers",
        holderReward:
          "20% discount on all merch + priority access to limited quantity items",
        milestoneMarketCap: 3500000,
        isUnlocked: false,
        unlockedDate: null,
      },
      {
        id: 5,
        title: "In-Person Fan Meetup Event",
        creatorGoal:
          "Host an offline fan meetup with games, photo opportunities, and special performances",
        holderReward:
          "Free event entry + exclusive signed merchandise + VIP meet & greet session",
        milestoneMarketCap: 5000000,
        isUnlocked: false,
        unlockedDate: null,
      },
    ],
  };
  // 🔴 END MOCK DATA

  const loadCreatorData = async () => {
    const { data: creatorData } = await supabase
      .from("creators")
      .select("*")
      .eq("slug", currentCreator)
      .eq("enabled", true)
      .maybeSingle();

    if (creatorData) {
      setCreator(creatorData);

      const { data: perksData } = await supabase
        .from("perks")
        .select("*")
        .eq("creator_id", creatorData.id);

      if (perksData) {
        setPerks(perksData);
      }

      if (creatorData.youtube_channel_id) {
        setVideosLoading(true);
        setVideosError(null);
        try {
          const videoData = await fetchAndCacheVideos(
            creatorData.id,
            creatorData.youtube_channel_id
          );
          setVideos(videoData);
        } catch (error) {
          console.error("Error loading videos:", error);
          setVideosError("Failed to load videos. Please try again later.");
        } finally {
          setVideosLoading(false);
        }
      }
      if (creatorData?.token_address) {
        const loadTokenData = async () => {
          try {
            setIsLoading(true);
            const [dexData] = await Promise.all([
              fetchDexScreenerData(creatorData?.token_address),
            ]);
            const combinedData = {
              address: creatorData?.token_address,
              description: `token`,
              price: dexData?.priceUsd ? parseFloat(dexData.priceUsd) : 0,
              priceChange: {
                percentage: dexData?.priceChange?.h24 || 0,
                period: "24h",
              },
              marketCap: dexData?.marketCap || 0,
              volume24h: dexData?.volume?.h24 || 0,
              holders: dexData?.info?.holders || 0,
            };
            setTokenData(combinedData);
          } catch (err) {
            console.error("Error loading token data:", err);
            setError("Failed to load token data");
          } finally {
            setIsLoading(false);
          }
        };
        loadTokenData();
      }
    }
  };

  const handleFollowToggle = async () => {
    if (!isAuthenticated || !creator) {
      onFollowClick();
      return;
    }

    setFollowLoading(true);

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("user_id", user.id)
        .eq("creator_id", creator.id);

      if (!error) {
        setIsFollowing(false);
      }
    } else {
      const { error } = await supabase.from("follows").insert({
        user_id: user.id,
        creator_id: creator.id,
      });

      if (!error) {
        setIsFollowing(true);
      }
    }

    setFollowLoading(false);
  };

  const checkFollowStatus = async () => {
    if (!creator || !user?.id) return;

    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("user_id", user.id)
      .eq("creator_id", creator.id)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const formatCompactNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  useEffect(() => {
    loadCreatorData();
  }, [currentCreator]);

  useEffect(() => {
    if (creator) {
      // if (publicKey?.toBase58() && user?.wallet_address) {
      //   loadUserKeys();
      // }
      if (isAuthenticated && user?.id) {
        checkFollowStatus();
      }
    }
  }, [isAuthenticated, publicKey?.toBase58(), user, creator]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Main Content - 2 Column Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Character Art Card */}
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                {/* Art Container */}
                <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 aspect-[3/4] flex items-end justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* 🔴 MOCK IMAGE - Replace with database URL */}
                  {/* TODO: Use creatorData.character_art_url from DB */}
                  <img
                    src={creator?.avatar_detail_url}
                    alt={creator?.name}
                    className="w-full object-contain h-full"
                  />
                  {/* Live Badge */}
                  {!creatorData.isLive && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm font-semibold">LIVE</span>
                    </div>
                  )}
                </div>

                {/* Creator Info */}
                {/* 🔴 ALL DATA IN THIS SECTION FROM DATABASE */}
                <div className="p-6 bg-white">
                  {/* 🔴 MOCK DATA - creatorData.name from DB */}
                  <h1 className="text-2xl mb-1 text-gray-900">
                    {creator?.name}
                  </h1>
                  {/* 🔴 MOCK DATA - creatorData.subtitle from DB */}
                  {/* <p className="text-sm text-gray-600 mb-3">
                    {creatorData.subtitle}
                  </p> */}

                  <div className="flex items-center gap-2 mb-4">
                    {/* 🔴 MOCK DATA - creatorData.type from DB */}
                    {/* <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700"
                    >
                      {creatorData.type}
                    </Badge> */}
                    {/* 🔴 MOCK DATA - creatorData.subscribers from DB */}
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-gray-700"
                    >
                      {formatCompactNumber(creator?.subscribers || 0)} Subs
                    </Badge>
                  </div>

                  {/* Social Links */}
                  {/* 🔴 ALL SOCIAL LINKS FROM DATABASE - creatorData.socials */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {creator?.youtube_handle && (
                      <a
                        href={`https://youtube.com/@${creator?.youtube_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-red-600"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                    {creator?.twitch_url && (
                      <a
                        href={creator?.twitch_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-purple-600"
                      >
                        <Twitch className="w-5 h-5" />
                      </a>
                    )}
                    {creator?.twitter_url && (
                      <a
                        href={creator?.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-600 hover:text-blue-500"
                      >
                        <XIcon
                          color="gray"
                          className="w-5 h-5 text-gray-600 hover:text-blue-500"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Section - Sticky */}
            {/* ���� ALL TRADING DATA FROM DATABASE/BLOCKCHAIN */}
            {/* <Card className="shadow-xl lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Trade Tokens</span>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      creatorData.change24h >= 0
                        ? "text-[#03EC86]"
                        : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>{creatorData.change24h}%</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-[#7E34FF]/10 to-[#03EC86]/10 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    Current Price
                  </div>
                  <div className="text-3xl mb-1 text-gray-900">
                    {formatSOL(creatorData.tokenPrice)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ ${(creatorData.tokenPrice * 100).toFixed(2)} USD
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market Cap</div>
                    <div className="text-sm text-gray-900">
                      {formatUSD(creatorData.marketCap)}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                    <div className="text-sm text-gray-900">
                      {formatUSD(creatorData.volume24h)}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Holders</div>
                    <div className="text-sm text-gray-900">
                      {creatorData.holders.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Total Views
                    </div>
                    <div className="text-sm text-gray-900">
                      {formatCompactNumber(creatorData.totalViews)}
                    </div>
                  </div>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                  </TabsList>

                  <TabsContent value="buy" className="space-y-3 mt-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Amount (SOL)
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Button className="w-full bg-[#03EC86] hover:bg-[#02D176] text-gray-900 text-lg py-6">
                      Buy Tokens
                    </Button>
                  </TabsContent>

                  <TabsContent value="sell" className="space-y-3 mt-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Amount (Tokens)
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Button className="w-full bg-[#7E34FF] hover:bg-[#6B2DD9] text-white text-lg py-6">
                      Sell Tokens
                    </Button>
                  </TabsContent>
                </Tabs>

                <p className="text-xs text-gray-500 text-center">
                  Connect your Solana wallet to start trading
                </p>
              </CardContent>
            </Card> */}
          </div>

          {/* RIGHT COLUMN - SCROLLABLE MAIN STAGE */}
          <div className="space-y-6">
            {/* <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Last Price: 0.000123
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <img
                    src={image_fb0f00bcf8c51620020e4db0c8bb0206986ff5f9}
                    alt="Token Price Chart"
                    className="w-full h-auto object-cover p-[60px]"
                  />
                </div>
              </CardContent>
            </Card> */}

            {/* Goals & Rewards Section */}
            {/* 🔴 GOALS SECTION - All data from database */}
            {/* <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Goals & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creatorData.goals.map((goal) => {
                  const progressPercentage = Math.min(
                    (creatorData.marketCap / goal.milestoneMarketCap) * 100,
                    100
                  );

                  return (
                    <div
                      key={goal.id}
                      className={`rounded-lg p-4 transition-all ${
                        goal.isUnlocked ? "bg-[#03EC86]/10" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`flex-shrink-0 mt-0.5 ${
                            goal.isUnlocked ? "text-[#03EC86]" : "text-gray-400"
                          }`}
                        >
                          {goal.isUnlocked ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Lock className="w-6 h-6" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <h4
                              className={`font-semibold ${
                                goal.isUnlocked
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {goal.title}
                            </h4>
                            {goal.isUnlocked && goal.unlockedDate && (
                              <Badge
                                variant="secondary"
                                className="bg-[#03EC86]/20 text-[#03EC86] shrink-0"
                              >
                                Unlocked
                              </Badge>
                            )}
                          </div>

                          <div className="mb-3 p-3 bg-white/80 rounded-md">
                            <div className="flex items-start gap-2 mb-1">
                              <Trophy className="w-4 h-4 text-[#7E34FF] mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-[#7E34FF]">
                                Creator Goal
                              </span>
                            </div>
                            <p
                              className={`text-sm ml-6 ${
                                goal.isUnlocked
                                  ? "text-gray-700"
                                  : "text-gray-600"
                              }`}
                            >
                              {goal.creatorGoal}
                            </p>
                          </div>

                          <div className="mb-3 p-3 bg-white/80 rounded-md">
                            <div className="flex items-start gap-2 mb-1">
                              <Gift className="w-4 h-4 text-[#03EC86] mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-gray-700">
                                Token Holder Reward
                              </span>
                            </div>
                            <p
                              className={`text-sm ml-6 ${
                                goal.isUnlocked
                                  ? "text-gray-700"
                                  : "text-gray-600"
                              }`}
                            >
                              {goal.holderReward}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                Milestone: {formatUSD(goal.milestoneMarketCap)}{" "}
                                Market Cap
                              </span>
                              {goal.isUnlocked && goal.unlockedDate ? (
                                <span className="text-[#03EC86] font-semibold">
                                  {goal.unlockedDate}
                                </span>
                              ) : (
                                <span className="text-gray-900 font-semibold">
                                  {progressPercentage.toFixed(0)}%
                                </span>
                              )}
                            </div>

                            {!goal.isUnlocked && (
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-[#7E34FF] to-[#03EC86] h-full transition-all duration-500 rounded-full"
                                  style={{ width: `${progressPercentage}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <p className="text-xs text-gray-500 text-center pt-2">
                  Goals unlock automatically when market cap milestones are
                  reached
                </p>
              </CardContent>
            </Card> */}

            {/* Statistics - Tabs */}
            {/* 🔴 ALL STATISTICS DATA FROM DATABASE */}
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isFollowing
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-[#7E34FF] text-white hover:bg-purple-700"
              } disabled:opacity-50`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Follow
                </>
              )}
            </button>
            {creator?.token_address ? (
              isLoading ? (
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto animate-spin mb-4"></div>
                  <p className="text-gray-500">Loading Chart...</p>
                </div>
              ) : (
                tokenData?.address && (
                  <ChartContainer
                    tokenAddress={tokenData?.address || ""}
                    price={tokenData?.price || 0}
                    height={500}
                  />
                )
              )
            ) : null}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Creator Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    {/* <TabsTrigger value="growth">Growth</TabsTrigger> */}
                    {/* <TabsTrigger value="personal">Profile</TabsTrigger> */}
                  </TabsList>

                  {/* 🔴 OVERVIEW TAB - ALL DATA FROM DATABASE */}
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 🔴 MOCK DATA - creatorData.subscribers */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Subscribers</span>
                        </div>
                        <div className="text-2xl text-gray-900">
                          {formatCompactNumber(creator?.subscribers || 0)}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.totalViews */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">Total Views</span>
                        </div>
                        <div className="text-2xl text-gray-900">
                          {formatCompactNumber(creator?.total_views || 0)}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.totalContent */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Video className="w-4 h-4" />
                          <span className="text-sm">Total Content</span>
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.total_contents}
                        </div>
                      </div>
                      {/* ��� MOCK DATA - creatorData.contentStats.totalLikes */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">Total Likes</span>
                        </div>
                        <div className="text-2xl text-gray-900">
                          {formatCompactNumber(creator?.total_likes || 0)}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.contentStats.totalDuration */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Content Hours</span>
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.all_content_duration_hours?.toLocaleString()}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.personal.activeTime */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Active Time</span>
                        </div>
                        <div className="text-lg text-gray-900">
                          {creator?.most_active_time}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 🔴 CONTENT TAB - ALL DATA FROM DATABASE */}
                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* 🔴 MOCK DATA - creatorData.contentStats.totalVideos */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Videos
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.total_videos}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.contentStats.totalShorts */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Shorts
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.total_shorts}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.contentStats.totalLivestreams */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Livestreams
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.total_livestreams}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.contentStats.livestreamRatio */}
                      {/* <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Livestream Ratio
                        </div>
                        <div className="text-2xl text-gray-900">
                          {creator?.total_livestreams}%
                        </div>
                      </div> */}
                    </div>
                    <Separator />
                    {/* 🔴 ALL CONTENT STATS FROM DATABASE */}
                    <div className="space-y-3">
                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-600">Longest Content:</span>
                        <span className="text-gray-900">
                          {creatorData.contentStats.longestContent}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shortest Content:</span>
                        <span className="text-gray-900">
                          {creatorData.contentStats.shortestContent}
                        </span>
                      </div> */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Avg. Live Duration:
                        </span>
                        <span className="text-gray-900">
                          {creator?.avg_live_duration_hours} hours
                        </span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 🔴 GROWTH TAB - ALL DATA FROM DATABASE */}
                  {/* <TabsContent value="growth" className="space-y-4 mt-4">
                    <div className="bg-slate-100 rounded-xl p-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">
                            Latest Subscriber Count
                          </span>
                          <span
                            className={`flex items-center gap-1 ${
                              creatorData.growth.subscriberChange >= 0
                                ? "text-[#03EC86]"
                                : "text-red-600"
                            }`}
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span>+{creatorData.growth.subscriberChange}%</span>
                          </span>
                        </div>
                        <div className="text-3xl text-gray-900">
                          {creatorData.growth.subscriberCount.toLocaleString()}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">
                            Latest Views Count
                          </span>
                          <span
                            className={`flex items-center gap-1 ${
                              creatorData.growth.viewChange >= 0
                                ? "text-[#03EC86]"
                                : "text-red-600"
                            }`}
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span>+{creatorData.growth.viewChange}%</span>
                          </span>
                        </div>
                        <div className="text-3xl text-gray-900">
                          {creatorData.growth.viewCount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Growth data updated daily
                    </p>
                  </TabsContent> */}

                  {/* 🔴 PERSONAL/PROFILE TAB - ALL DATA FROM DATABASE */}
                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* 🔴 MOCK DATA - creatorData.personal.gender */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Gender</div>
                        <div className="text-gray-900">
                          {creatorData.personal.gender}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.personal.height */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Height</div>
                        <div className="text-gray-900">
                          {creatorData.personal.height} cm
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.personal.language */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Language
                        </div>
                        <div className="text-gray-900">
                          {creatorData.personal.language}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.personal.modelType */}
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          Model Type
                        </div>
                        <div className="text-gray-900">
                          {creatorData.personal.modelType}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.personal.birthDate & zodiac */}
                      <div className="bg-slate-100 rounded-lg p-4 col-span-2">
                        <div className="text-sm text-gray-600 mb-1">
                          Birth Date
                        </div>
                        <div className="text-gray-900">
                          {creatorData.personal.birthDate} (
                          {creatorData.personal.zodiac})
                        </div>
                      </div>
                    </div>
                    <Separator />
                    {/* 🔴 ALL PREFERENCES FROM DATABASE */}
                    <div className="space-y-4">
                      {/* 🔴 MOCK DATA - creatorData.preferences.likes */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Likes</div>
                        <div className="flex flex-wrap gap-2">
                          {creatorData.preferences.likes.map((like, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              {like}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.preferences.dislikes */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">
                          Dislikes
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {creatorData.preferences.dislikes.map(
                            (dislike, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-red-100 text-red-700"
                              >
                                {dislike}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                      {/* 🔴 MOCK DATA - creatorData.preferences.hobbies */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">
                          Hobbies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {creatorData.preferences.hobbies.map(
                            (hobby, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-purple-100 text-purple-700"
                              >
                                {hobby}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Character Banner */}
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <img
                src={creator?.banner_url || ""}
                alt={`${creator?.name} Banner`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* About Section */}
            {/* 🔴 ABOUT SECTION - All data from database */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 🔴 MOCK DATA - Replace with creatorData.about from DB */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {creator?.bio}
                </p>
                <div className="space-y-2 text-sm">
                  {/* <div className="flex items-center gap-2">
                    <span className="text-gray-500">Name Meaning:</span>
                    <span className="text-gray-900">
                      {creatorData.nameMeaning}
                    </span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Nickname:</span>
                    <span className="text-gray-900">{creator?.slug}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <span className="text-gray-500">Debut Date:</span>
                    <span className="text-gray-900">
                      {creatorData.personal.debutDate}
                    </span>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Live Stream Section */}
            {/* 🔴 MOCK DATA - creatorData.isLive from DB */}
            {/* {creatorData.isLive ? (
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="relative bg-black aspect-video flex items-center justify-center">
                    <ImageWithFallback
                      src=""
                      alt="Live Stream"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm">LIVE NOW</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                        <Users className="w-4 h-4" />
                        <span>
                          {creatorData.liveViewers.toLocaleString()} watching
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                        <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl mb-2">
                      Playing RPG & Chatting with Community 🎮
                    </h3>
                    <p className="text-gray-600">
                      Started 2 hours ago • {creatorData.liveViewers} viewers
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7E34FF] to-[#03EC86] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2">Currently Offline</h3>
                  <p className="text-gray-600 mb-4">
                    Get notified when {creatorData.name} goes live!
                  </p>
                  <Button className="bg-[#7E34FF] hover:bg-[#6B2DD9] text-white">
                    Enable Notifications
                  </Button>
                </CardContent>
              </Card>
            )} */}

            {/* Comments Section
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Community Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts about this creator..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button className="bg-[#7E34FF] hover:bg-[#6B2DD9] text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>

                <Separator />
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src=""
                          alt={comment.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-900">
                            {comment.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.text}</p>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#7E34FF] transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            <div className="mt-6">
              <Comments creatorId={creator?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
