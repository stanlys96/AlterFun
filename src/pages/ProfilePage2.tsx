import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Wallet,
  Copy,
  Check,
  ExternalLink,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAuth } from "../contexts/AuthContext";
import { Creator, Follow, supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

// 🔴 MOCK USER DATA - Replace with real user data from database/authentication
const mockUserData = {
  username: "CryptoFan_2024",
  email: "user@example.com",
  joinDate: "March 2024",
  avatarUrl: "",
  walletAddress: null as string | null,
  // Portfolio tokens owned
  ownedTokens: [
    {
      id: "1",
      creatorName: "Sakura Hoshino",
      creatorAvatar: "",
      tokenAmount: 1250,
      currentValue: 875.5,
      purchaseValue: 625.0,
      change: 40.08,
    },
    {
      id: "2",
      creatorName: "Luna Eclipse",
      creatorAvatar: "",
      tokenAmount: 890,
      currentValue: 534.2,
      purchaseValue: 445.0,
      change: 20.04,
    },
    {
      id: "3",
      creatorName: "Kira Starlight",
      creatorAvatar: "",
      tokenAmount: 2100,
      currentValue: 1260.0,
      purchaseValue: 1050.0,
      change: 20.0,
    },
  ],
  // Followed creators
  followedCreators: [
    {
      id: "1",
      name: "Sakura Hoshino",
      type: "VTuber",
      avatar: "",
      banner:
        "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGN5YmVycHVuayUyMG5lb24lMjBwdXJwbGV8ZW58MXx8fHwxNzYyMjI4MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080", // Banner from database
      subscribers: 2500000,
      isLive: true,
      tokenPrice: 0.7,
    },
    {
      id: "2",
      name: "Luna Eclipse",
      type: "Gaming Creator",
      avatar: "",
      banner:
        "https://images.unsplash.com/photo-1708032565079-f43e698f4db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMG5lb24lMjBsaWdodHN8ZW58MXx8fHwxNzYyMjI4MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080", // Banner from database
      subscribers: 1800000,
      isLive: false,
      tokenPrice: 0.6,
    },
    {
      id: "3",
      name: "Kira Starlight",
      type: "Music Artist",
      avatar: "",
      banner:
        "https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NjIxMzI0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080", // Banner from database
      subscribers: 3200000,
      isLive: true,
      tokenPrice: 0.6,
    },
    {
      id: "4",
      name: "Nova Dreams",
      type: "VTuber",
      avatar: "",
      banner:
        "https://images.unsplash.com/photo-1673526759317-be71a1243e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGdyYWRpZW50fGVufDF8fHx8MTc2MjIyMDIzMHww&ixlib=rb-4.1.0&q=80&w=1080", // Banner from database
      subscribers: 1500000,
      isLive: false,
      tokenPrice: 0.45,
    },
  ],
};

type FollowWithCreator = Follow & {
  creator: Creator;
};

export const ProfilePage2 = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(
    mockUserData.walletAddress
  );
  const [walletName, setWalletName] = useState<string>("Phantom");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [following, setFollowing] = useState<FollowWithCreator[]>([]);
  const { user, isWalletConnected, connectWallet, isAuthenticated } = useAuth();

  // 🔴 MOCK FUNCTION - Replace with real Solana wallet connection
  const handleWalletConnect = (name: string, address: string) => {
    console.log(`✅ Wallet connected: ${name} - ${address}`);
    setWalletName(name);
    setWalletAddress(address);
    // TODO: Store wallet address in database
  };

  // 🔴 MOCK FUNCTION - Replace with real wallet disconnect
  const handleDisconnectWallet = () => {
    console.log("Disconnecting wallet...");
    setWalletAddress(null);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress || "");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const formatSOL = (amount: number) => `${amount.toFixed(5)} USD`;
  const formatUSD = (amount: number) =>
    `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  const formatCompactNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Calculate total portfolio value
  const totalPortfolioValue = mockUserData.ownedTokens.reduce(
    (sum, token) => sum + token.currentValue,
    0
  );
  const totalPurchaseValue = mockUserData.ownedTokens.reduce(
    (sum, token) => sum + token.purchaseValue,
    0
  );
  const totalChange =
    ((totalPortfolioValue - totalPurchaseValue) / totalPurchaseValue) * 100;

  const loadProfileData = async () => {
    if (!user) return;

    if (walletAddress) {
      const { data: creatorsData } = await supabase
        .from("creators")
        .select("*")
        .eq("enabled", true)
        .in("slug", ["miko-sakura", "aria-volt", "kira-neon"]);
    }

    const { data: followsData } = await supabase
      .from("follows")
      .select("*, creators(*)")
      .eq("user_id", user.id);

    if (followsData) {
      setFollowing(
        followsData.map((f) => ({
          ...f,
          creator: f.creators as unknown as Creator,
        }))
      );
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header Card */}
        {/* 🔴 ALL USER DATA FROM DATABASE/AUTH */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <img
                src={user?.profile_picture_url || ""}
                alt="Profile Picture"
                className="w-24 h-24 border-4 border-[#7E34FF]/20 rounded-full"
              />
              {/* <Avatar className="w-24 h-24 border-4 border-[#7E34FF]/20">
                <AvatarImage src={user?.profile_picture_url} />
                <AvatarFallback className="bg-gradient-to-br from-[#7E34FF] to-[#03EC86] text-white text-2xl">
                  {user?.username.charAt(0)}
                </AvatarFallback>
              </Avatar> */}

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl text-gray-900 mb-1">
                  {user?.username}
                </h2>
                <p className="text-gray-600 mb-2">{user?.email}</p>
                {/* <p className="text-sm text-gray-500">
                  Member since {mockUserData.joinDate}
                </p> */}
              </div>

              {/* Wallet Section */}
              <div className="flex flex-col gap-3">
                <WalletMultiButton />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        {/* 🔴 ALL PORTFOLIO DATA FROM DATABASE/BLOCKCHAIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900 mb-1">
                {formatUSD(totalPortfolioValue)}
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  totalChange >= 0 ? "text-[#03EC86]" : "text-red-600"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>
                  {totalChange >= 0 ? "+" : ""}
                  {totalChange.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card> */}

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                Tokens Owned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900">0</div>
              <div className="text-sm text-gray-500">Creators</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Following</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900">
                {mockUserData.followedCreators.length}
              </div>
              <div className="text-sm text-gray-500">Creators</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Tokens & Following */}
        {/* 🔴 ALL TAB DATA FROM DATABASE */}
        <Tabs defaultValue="following" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            {/* <TabsTrigger value="tokens">Owned Tokens</TabsTrigger> */}
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          {/* Owned Tokens Tab */}
          <TabsContent value="tokens" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUserData.ownedTokens.map((token) => (
                <Card
                  key={token.id}
                  className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden"
                >
                  {/* Card Header with gradient background */}
                  <div className="bg-gradient-to-br from-[#7E34FF]/10 to-[#03EC86]/10 p-6 pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                        <AvatarImage src={token.creatorAvatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#7E34FF] to-[#03EC86] text-white text-xl">
                          {token.creatorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-1">
                          {token.creatorName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Wallet className="w-3 h-3" />
                          <span>
                            {token.tokenAmount.toLocaleString()} tokens
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Current Value - Large Display */}
                    <div className="text-center py-4">
                      <div className="text-xs text-gray-600 mb-1">
                        Current Value
                      </div>
                      <div className="text-3xl text-gray-900 mb-2">
                        {formatUSD(token.currentValue)}
                      </div>
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          token.change >= 0
                            ? "bg-[#03EC86]/20 text-[#03EC86]"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>
                          {token.change >= 0 ? "+" : ""}
                          {token.change.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-6 pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Purchase Value</span>
                        <span className="text-gray-900">
                          {formatUSD(token.purchaseValue)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Profit/Loss</span>
                        <span
                          className={
                            token.currentValue >= token.purchaseValue
                              ? "text-[#03EC86]"
                              : "text-red-600"
                          }
                        >
                          {token.currentValue >= token.purchaseValue ? "+" : ""}
                          {formatUSD(token.currentValue - token.purchaseValue)}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-[#7E34FF] hover:bg-[#6B2DE0] text-white"
                      size="sm"
                    >
                      Trade
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="mt-6">
            <div
              className={`grid grid-cols-1 ${
                following?.length === 0 ? "md:grid-cols-1" : "md:grid-cols-2"
              } gap-6`}
            >
              {following?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Not following any creators yet
                </p>
              ) : (
                following?.map((follow) => (
                  <Card
                    key={follow.id}
                    className="shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden"
                  >
                    {/* Banner Image */}
                    <div className="relative h-32 overflow-hidden">
                      {/* <ImageWithFallback
                        src={follow.banner}
                        alt={`${follow.name} banner`}
                        className="w-full h-full object-cover"
                      /> */}
                      {/* Live Badge on Banner */}
                      {follow?.creator?.isLive && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          LIVE
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Creator Info - Overlapping Banner */}
                    <div className="relative px-6 pb-6">
                      {/* Avatar - Positioned to overlap banner */}

                      <div className="-mt-10 mb-4">
                        <img
                          src={follow?.creator?.avatar_url || ""}
                          className="w-20 h-20 border-4 border-white shadow-xl rounded-full"
                        />
                      </div>

                      {/* Creator Details */}
                      <div className="mb-4">
                        <h3 className="text-xl text-gray-900 mb-2">
                          {follow?.creator?.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            {follow?.creator?.type || "Vtuber"}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>
                              {formatCompactNumber(
                                follow?.creator?.subscribers || 0
                              )}{" "}
                              Subs
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator className="mb-4" />

                      {/* Token Price */}
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Token Price
                        </div>
                        <div className="text-lg text-gray-900">
                          {formatSOL(follow?.creator?.token_price || 0)}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
