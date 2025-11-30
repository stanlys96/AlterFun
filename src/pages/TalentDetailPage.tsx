import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Zap,
  Crown,
  Clock,
  Lock,
  Ticket,
  Eye,
  Users,
  PlayCircle,
  Radio,
  ThumbsUp,
  Video,
  Film,
  ShoppingBag,
  ArrowRight,
  Gem,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";
import { formatNumber } from "../utils/utils";
import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";

interface Mission {
  id: number;
  title: string;
  reward: number;
  status: "available" | "completed" | "claimed";
}

export function TalentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const creatorChapterId = location.pathname.split("/")?.[2];
  const fetcher = async (key: string) => {
    const { data, error } = await supabase
      .from(key)
      .select("*")
      .eq("creator_chapters_id", creatorChapterId);
    if (error) throw error;
    return data;
  };
  const { data: missionsData } = useSWR(
    "creator_chapters_sparks_missions",
    fetcher
  );

  const { currentCreatorChapter, user, updateUser } = useAuth();
  const missionsFetcher = async (key: string) => {
    const { data, error } = await supabase
      .from(key)
      .select("*")
      .eq("user_id", user?.id)
      .eq("creator_chapters_id", creatorChapterId);
    if (error) throw error;
    return data;
  };

  const { data: userMissionsData, mutate: userMissionsDataMutate } = useSWR(
    "creator_chapters_sparks_users",
    missionsFetcher
  );

  const storesFetcher = async (key: string) => {
    const { data, error } = await supabase
      .from(key)
      .select("*")
      .eq("creator_id", currentCreatorChapter?.creators?.id);
    if (error) throw error;
    return data;
  };

  const { data: userStoresData } = useSWR("official_products", storesFetcher);

  const getMissionStatus = (id: any) => {
    return userMissionsData?.find(
      (userMission) => userMission.creator_chapters_sparks_missions_id === id
    )?.status;
  };

  // const fetcher = async (key: string) => {
  //   const { data, error } = await supabase
  //     .from(key)
  //     .select("*, creators(*)")
  //     .eq("id", creatorChapterId)
  //     .single();
  //   if (error) throw error;
  //   return data;
  // };
  // const { data: currentCreatorChapter } = useSWR("creator_chapters", fetcher);

  const talent = {
    id: 1,
    name: "Auremiya",
    image:
      "https://images.unsplash.com/photo-1653981215619-12a857d7f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc3RyZWFtZXIlMjBnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3NjQyMDQ1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isLive: true,
    chapter: "Chapter 2: Nexus",
    generation: "Gen 1",
  };

  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d">("7d");

  const [votes] = useState([
    {
      id: 1,
      title: "Next Game to Play",
      options: ["Genshin Impact", "Honkai Star Rail"],
      votes: [65, 35],
    },
    {
      id: 2,
      title: "Next Outfit Color",
      options: ["Purple", "Pink"],
      votes: [45, 55],
    },
  ]);

  const calculateTimeLeft = () => {
    const difference =
      new Date(currentCreatorChapter?.expired_at).getTime() -
      new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Chart data
  const contentData7d = [
    { day: "Mon", videos: 2, shorts: 8, streams: 3 },
    { day: "Tue", videos: 1, shorts: 12, streams: 2 },
    { day: "Wed", videos: 3, shorts: 6, streams: 4 },
    { day: "Thu", videos: 2, shorts: 10, streams: 3 },
    { day: "Fri", videos: 1, shorts: 9, streams: 5 },
    { day: "Sat", videos: 4, shorts: 15, streams: 2 },
    { day: "Sun", videos: 3, shorts: 11, streams: 3 },
  ];

  const contentData30d = [
    { day: "W1", videos: 8, shorts: 45, streams: 12 },
    { day: "W2", videos: 10, shorts: 52, streams: 15 },
    { day: "W3", videos: 12, shorts: 48, streams: 13 },
    { day: "W4", videos: 8, shorts: 55, streams: 14 },
  ];

  const subscriberData7d = [
    { day: "Mon", count: 12800 },
    { day: "Tue", count: 12850 },
    { day: "Wed", count: 12920 },
    { day: "Thu", count: 13000 },
    { day: "Fri", count: 13050 },
    { day: "Sat", count: 13080 },
    { day: "Sun", count: 13100 },
  ];

  const subscriberData30d = [
    { day: "W1", count: 12200 },
    { day: "W2", count: 12500 },
    { day: "W3", count: 12800 },
    { day: "W4", count: 13100 },
  ];

  const viewerData7d = [
    { day: "Mon", views: 118000 },
    { day: "Tue", views: 122000 },
    { day: "Wed", views: 125000 },
    { day: "Thu", views: 119000 },
    { day: "Fri", views: 128000 },
    { day: "Sat", views: 135000 },
    { day: "Sun", views: 132000 },
  ];

  const viewerData30d = [
    { day: "W1", count: 480000 },
    { day: "W2", count: 510000 },
    { day: "W3", count: 495000 },
    { day: "W4", count: 535000 },
  ];

  const formatTime = (num: number) => String(num).padStart(2, "0");

  const contentActivityData =
    chartPeriod === "7d" ? contentData7d : contentData30d;
  const subscriberGrowthData =
    chartPeriod === "7d" ? subscriberData7d : subscriberData30d;
  const viewerGrowthData = chartPeriod === "7d" ? viewerData7d : viewerData30d;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60); // update every minute

    return () => clearInterval(timer);
  }, [currentCreatorChapter?.expired_at]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Chapter Banner */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={currentCreatorChapter?.creators?.banner_url}
            alt="Chapter Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Back Button */}
        {/* <button
          onClick={() => navigate(-1)}
          style={{ zIndex: 100000 }}
          className="absolute cursor-pointer top-24 left-4 lg:left-8 z-1000000 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Talents</span>
        </button> */}

        {/* Chapter Info */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Chapter Title */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-white">
                  Current Chapter
                </div>
                <h1
                  className="text-white text-5xl lg:text-6xl mb-2"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  CHAPTER {currentCreatorChapter?.chapter_number}:{" "}
                  {currentCreatorChapter?.chapter_name}
                </h1>
                <h2
                  className="text-white text-3xl lg:text-4xl"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {currentCreatorChapter?.creators?.name}
                </h2>
              </div>

              {/* Countdown Timer */}
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-8 text-center">
                <div className="text-white/80 text-sm mb-3 font-semibold">
                  Chapter Ends In
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div>
                    <div
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {formatTime(timeLeft?.days)}
                    </div>
                    <div className="text-xs text-white/70 mt-1">Days</div>
                  </div>
                  <div className="text-3xl text-white/50">:</div>
                  <div>
                    <div
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {formatTime(timeLeft?.hours)}
                    </div>
                    <div className="text-xs text-white/70 mt-1">Hours</div>
                  </div>
                  <div className="text-3xl text-white/50">:</div>
                  <div>
                    <div
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {formatTime(timeLeft?.minutes)}
                    </div>
                    <div className="text-xs text-white/70 mt-1">Mins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50 border-b-2 border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-300 shadow-2xl flex-shrink-0 mx-auto md:mx-0">
              <ImageWithFallback
                src={currentCreatorChapter?.creators?.avatar_url}
                alt={talent.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1
                className="text-5xl mb-4 text-gray-900"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {currentCreatorChapter?.creators?.name}
              </h1>
              <p className="text-gray-700 text-lg max-w-3xl mb-4">
                {currentCreatorChapter?.creators?.bio}
              </p>
              {/* <button
                onClick={() => setShowFullLore(!showFullLore)}
                className="text-purple-600 hover:text-purple-700 font-semibold mb-6"
              >
                {showFullLore ? "Show Less" : "Read More"}
              </button> */}

              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white border-2 border-purple-200 rounded-xl px-6 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-gray-900 font-bold">
                        {formatNumber(
                          currentCreatorChapter?.creators?.subscribers
                        )}
                      </div>
                      <div className="text-gray-600 text-xs">Subscribers</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-xl px-6 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-gray-900 font-bold">
                        {formatNumber(
                          currentCreatorChapter?.creators?.total_views
                        )}
                      </div>
                      <div className="text-gray-600 text-xs">Total Views</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-xl px-6 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-gray-900 font-bold">
                        {currentCreatorChapter?.creators?.total_contents}
                      </div>
                      <div className="text-gray-600 text-xs">
                        Total Contents
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-xl px-6 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-gray-900 font-bold">
                        {currentCreatorChapter?.creators?.most_active_time}
                      </div>
                      <div className="text-gray-600 text-xs">Active Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Top 3 Merch */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-purple-600" />
                    <h2
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      Redeem with AlterSparks
                    </h2>
                  </div>
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Merch Item 1 */}
                  {userStoresData?.slice(0, 3)?.map((userStore) => (
                    <div className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl overflow-hidden hover:border-purple-400 transition-all hover:shadow-xl cursor-pointer">
                      <div className="aspect-square bg-purple-100 flex items-center justify-center">
                        <ImageWithFallback
                          src={userStore?.image}
                          alt={userStore?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {userStore?.name}
                        </h3>
                        <div className="flex items-center gap-1 text-purple-600 font-bold">
                          <Zap className="w-4 h-4 fill-purple-600" />
                          <span>{userStore?.price}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {userStore?.stock} left
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Decisions */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-2xl font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Community Decisions
                  </h2>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold">LIVE VOTING</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {votes.map((vote) => (
                    <div
                      key={vote.id}
                      className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl"
                    >
                      <h3 className="text-gray-900 font-semibold mb-4">
                        {vote.title}
                      </h3>

                      {vote.options.map((option, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-700 font-semibold">
                                  {option}
                                </span>
                                <span className="text-purple-600 font-bold">
                                  {vote.votes[idx]}%
                                </span>
                              </div>
                              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                                  style={{ width: `${vote.votes[idx]}%` }}
                                ></div>
                              </div>
                            </div>
                            <button className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all shadow-lg whitespace-nowrap">
                              <Zap className="w-4 h-4 fill-white" />
                              <span className="font-bold text-sm">50</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel Statistics */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
                <h2
                  className="text-2xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Channel Statistics
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="w-5 h-5 text-purple-600" />
                      <div className="text-sm text-gray-600">Total Videos</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentCreatorChapter?.creators?.total_videos}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Film className="w-5 h-5 text-pink-600" />
                      <div className="text-sm text-gray-600">Total Shorts</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentCreatorChapter?.creators?.total_shorts}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Radio className="w-5 h-5 text-red-600" />
                      <div className="text-sm text-gray-600">Livestreams</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentCreatorChapter?.creators?.total_livestreams}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="w-5 h-5 text-blue-600" />
                      <div className="text-sm text-gray-600">Total Likes</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(
                        currentCreatorChapter?.creators?.total_likes
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div className="text-sm text-gray-600">
                        Content Duration
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {
                        currentCreatorChapter?.creators
                          ?.all_content_duration_hours
                      }{" "}
                      hrs
                    </div>
                  </div>

                  {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Longest Content
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      14:32:13
                    </div>
                  </div> */}

                  {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Shortest Content
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      00:00:05
                    </div>
                  </div> */}

                  {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Livestream Ratio
                    </div>
                    <div className="text-xl font-bold text-gray-900">79.5%</div>
                  </div> */}

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Avg. Live Duration
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentCreatorChapter?.creators?.avg_live_duration_hours}{" "}
                      hrs
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <h2
                    className="text-2xl font-bold text-gray-900"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Analytics
                  </h2>
                  <div className="flex items-center gap-2 bg-purple-50 border-2 border-purple-200 rounded-xl p-1">
                    <button
                      onClick={() => setChartPeriod("7d")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        chartPeriod === "7d"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => setChartPeriod("30d")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        chartPeriod === "30d"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                    >
                      30 Days
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Content Activity */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Content Activity
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={contentActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                        <XAxis dataKey="day" stroke="#9333ea" />
                        <YAxis stroke="#9333ea" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "2px solid #e9d5ff",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="videos"
                          stroke="#9333ea"
                          strokeWidth={2}
                          name="Videos"
                        />
                        <Line
                          type="monotone"
                          dataKey="shorts"
                          stroke="#ec4899"
                          strokeWidth={2}
                          name="Shorts"
                        />
                        <Line
                          type="monotone"
                          dataKey="streams"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Streams"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Subscriber Growth */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Subscriber Growth
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={subscriberGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                        <XAxis dataKey="day" stroke="#9333ea" />
                        <YAxis stroke="#9333ea" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "2px solid #e9d5ff",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Subscribers"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Viewer Growth */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Viewer Growth
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={viewerGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                        <XAxis dataKey="day" stroke="#9333ea" />
                        <YAxis stroke="#9333ea" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "2px solid #e9d5ff",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey={chartPeriod === "7d" ? "views" : "count"}
                          stroke="#f59e0b"
                          strokeWidth={3}
                          name="Views"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Mission Board */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-purple-600" />
                    <h2
                      className="text-xl font-bold text-gray-900"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      Get AlterSparks Here
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {missionsData?.map((mission) => (
                      <div
                        key={mission?.id}
                        className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:border-purple-400 transition-colors"
                      >
                        <div className="text-gray-900 font-semibold text-sm mb-1">
                          {mission?.title}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-purple-600">
                            <Zap className="w-3 h-3 fill-purple-600" />
                            <span>+{mission?.sparks}</span>
                          </div>
                          <button
                            onClick={async () => {
                              const currentEmail = user?.email;
                              const theStatus = getMissionStatus(mission?.id);
                              if (theStatus === "completed") {
                                await supabase
                                  .from("creator_chapters_sparks_users")
                                  .update({
                                    status: "claimed",
                                  })
                                  .eq("user_id", user?.id)
                                  .eq(
                                    "creator_chapters_sparks_missions_id",
                                    mission?.id
                                  )
                                  .eq(
                                    "creator_chapters_id",
                                    currentCreatorChapter?.id
                                  );
                                await supabase
                                  .from("users")
                                  .update({
                                    sparks:
                                      (user?.sparks || 0) + mission?.sparks,
                                  })
                                  .eq("email", user?.email);
                                updateUser(currentEmail || "");
                              } else if (!theStatus) {
                                await supabase
                                  .from("creator_chapters_sparks_users")
                                  .insert({
                                    user_id: user?.id,
                                    status: "completed",
                                    creator_chapters_sparks_missions_id:
                                      mission?.id,
                                    creator_chapters_id:
                                      currentCreatorChapter?.id,
                                  });
                              }

                              await userMissionsDataMutate();
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              getMissionStatus(mission?.id) === "claimed"
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : getMissionStatus(mission?.id) === "completed"
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg"
                            }`}
                            disabled={
                              getMissionStatus(mission?.id) === "claimed"
                            }
                          >
                            {getMissionStatus(mission?.id) === "claimed"
                              ? "Done"
                              : getMissionStatus(mission?.id) === "completed"
                              ? "Claim"
                              : "Go"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VIP Access */}
                <div className="bg-gradient-to-br from-gray-900 to-purple-900 border-4 border-yellow-500/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <h2
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      Prime Members
                    </h2>
                  </div>

                  <p className="text-white/90 text-sm mb-4">
                    Jadilah Prime Member {talent.name} dan dapatkan akses
                    eksklusif.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-white">
                      <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">
                          Private Discord Access
                        </div>
                        <div className="text-xs text-white/70">
                          Exclusive community
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <Ticket className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">
                          Event Ticket Pre-sale
                        </div>
                        <div className="text-xs text-white/70">
                          Get tickets first
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <Eye className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">
                          24h Early Access
                        </div>
                        <div className="text-xs text-white/70">
                          See content first
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 py-3 rounded-xl hover:scale-105 transition-all shadow-lg font-bold text-sm flex items-center justify-center gap-2">
                    <Gem className="w-4 h-4" />
                    Get $CREATOR
                  </button>

                  <div className="text-center mt-3 text-white/70 text-xs flex items-center justify-center gap-1">
                    Hold <Gem className="w-3 h-3 inline" /> 100 $CREATOR to
                    unlock
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
