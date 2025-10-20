import { useState, useEffect, useMemo } from 'react';
import { Users, Eye, Video, ThumbsUp, TrendingUp, Clock, Gift, UserPlus, UserCheck } from 'lucide-react';
import { supabase, Creator, Perk, CreatorVideo, UserKeys } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import GrowthChart from './GrowthChart';
import SocialLinks from './SocialLinks';
import YouTubeVideoList from './YouTubeVideoList';
import Comments from './Comments';
import { fetchAndCacheVideos } from '../lib/youtube';

type CreatorProfileProps = {
  slug: string;
  onBuyClick: () => void;
};

export default function CreatorProfile({ slug, onBuyClick }: CreatorProfileProps) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [perks, setPerks] = useState<Perk[]>([]);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [statsTab, setStatsTab] = useState<'7d' | '30d'>('7d');
  const [videos, setVideos] = useState<CreatorVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState<string | null>(null);
  const [userKeys, setUserKeys] = useState<number>(0);
  const [showMobileTradeKeys, setShowMobileTradeKeys] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { user, isAuthenticated, isWalletConnected } = useAuth();

  useEffect(() => {
    loadCreatorData();
  }, [slug]);

  useEffect(() => {
    if (isWalletConnected && user?.wallet_address && creator) {
      loadUserKeys();
      checkFollowStatus();
    }
  }, [isWalletConnected, user?.wallet_address, creator]);

  const loadCreatorData = async () => {
    const { data: creatorData } = await supabase
      .from('creators')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (creatorData) {
      setCreator(creatorData);

      const { data: perksData } = await supabase
        .from('perks')
        .select('*')
        .eq('creator_id', creatorData.id);

      if (perksData) {
        setPerks(perksData);
      }

      if (creatorData.youtube_channel_id) {
        setVideosLoading(true);
        setVideosError(null);
        try {
          const videoData = await fetchAndCacheVideos(creatorData.id, creatorData.youtube_channel_id);
          setVideos(videoData);
        } catch (error) {
          console.error('Error loading videos:', error);
          setVideosError('Failed to load videos. Please try again later.');
        } finally {
          setVideosLoading(false);
        }
      }
    }
  };

  const loadUserKeys = async () => {
    if (!creator || !user?.wallet_address) return;

    const { data } = await supabase
      .from('user_keys')
      .select('keys_held')
      .eq('user_id', user.wallet_address)
      .eq('creator_id', creator.id)
      .maybeSingle();

    setUserKeys(data?.keys_held || 0);
  };

  const checkFollowStatus = async () => {
    if (!creator || !user?.wallet_address) return;

    const { data } = await supabase
      .from('follows')
      .select('id')
      .eq('user_wallet', user.wallet_address)
      .eq('creator_id', creator.id)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const handleFollowToggle = async () => {
    if (!isWalletConnected || !creator) {
      onBuyClick();
      return;
    }

    setFollowLoading(true);

    if (isFollowing) {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('user_wallet', user.wallet_address)
        .eq('creator_id', creator.id);

      if (!error) {
        setIsFollowing(false);
      }
    } else {
      const { error } = await supabase
        .from('follows')
        .insert({
          user_wallet: user.wallet_address,
          creator_id: creator.id
        });

      if (!error) {
        setIsFollowing(true);
      }
    }

    setFollowLoading(false);
  };

  const handleClaimPerk = async (perk: Perk) => {
    if (!isWalletConnected) {
      onBuyClick();
      return;
    }
    alert(`Claiming perk: ${perk.title}`);
  };

  const generateGrowthData = (baseValue: number, days: number) => {
    const data = [];
    const variance = baseValue * 0.001;
    for (let i = 0; i < days; i++) {
      const change = (Math.random() - 0.48) * variance;
      const value = baseValue + (change * i);
      data.push(Math.round(value));
    }
    return data;
  };

  const subscriberData = useMemo(() => {
    if (!creator) return [];
    return statsTab === '7d'
      ? generateGrowthData(creator.subscribers, 7)
      : generateGrowthData(creator.subscribers, 30);
  }, [creator, statsTab]);

  const viewsData = useMemo(() => {
    if (!creator) return [];
    return statsTab === '7d'
      ? generateGrowthData(creator.total_views, 7)
      : generateGrowthData(creator.total_views, 30);
  }, [creator, statsTab]);

  if (!creator) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const livestreamRatio = ((creator.total_livestreams / creator.total_contents) * 100).toFixed(1);
  const estimatedAmount = amount ? (parseFloat(amount) / creator.key_price).toFixed(2) : '0.00';
  const fees = amount ? (parseFloat(amount) * 0.025).toFixed(3) : '0.000';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-start gap-6">
          <img src={creator.avatar_url} alt={creator.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
          <div className="flex-1">
            <h1 className="text-3xl font-black text-gray-900 mb-2">{creator.name}</h1>
            <p className="text-gray-600 mb-4">{creator.bio}</p>
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-900">{(creator.subscribers / 1000).toFixed(1)}k</span>
                <span className="text-gray-500">subscribers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-900">{(creator.total_views / 1000).toFixed(0)}k</span>
                <span className="text-gray-500">views</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SocialLinks
                youtube={creator.youtube_handle ? `https://youtube.com/@${creator.youtube_handle}` : undefined}
                twitter={creator.twitter_url}
                instagram={creator.instagram_url}
                tiktok={creator.tiktok_url}
                facebook={creator.facebook_url}
                linkedin={creator.linkedin_url}
              />
              <button
                onClick={handleFollowToggle}
                disabled={followLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-[#7E34FF] text-white hover:bg-purple-700'
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
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Creator Stats</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-[#7E34FF] font-medium mb-1">Key Price</div>
                <div className="text-2xl font-bold text-gray-900">{creator.key_price.toFixed(2)} SOL</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-[#7E34FF] font-medium mb-1">Market Cap</div>
                <div className="text-2xl font-bold text-gray-900">{(creator.market_cap / 1000).toFixed(0)}k SOL</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-[#7E34FF] font-medium mb-1">Holders</div>
                <div className="text-2xl font-bold text-gray-900">{creator.holder_count}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-[#7E34FF] font-medium mb-1">24h Change</div>
                <div className={`text-2xl font-bold ${creator.price_change_24h >= 0 ? 'text-[#03EC86]' : 'text-red-600'}`}>
                  {creator.price_change_24h >= 0 ? '+' : ''}{creator.price_change_24h.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Content & Activity Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Video className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Videos</div>
                    <div className="text-lg font-bold text-gray-900">{creator.total_videos}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Video className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Shorts</div>
                    <div className="text-lg font-bold text-gray-900">{creator.total_shorts}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Video className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Livestreams</div>
                    <div className="text-lg font-bold text-gray-900">{creator.total_livestreams}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <TrendingUp className="w-5 h-5 text-[#03EC86]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Livestream Ratio</div>
                    <div className="text-lg font-bold text-gray-900">{livestreamRatio}%</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">All Content Duration</div>
                    <div className="text-lg font-bold text-gray-900">{creator.all_content_duration_hours.toFixed(0)} hr</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Avg. Live Duration</div>
                    <div className="text-lg font-bold text-gray-900">{creator.avg_live_duration_hours.toFixed(1)} hr</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ThumbsUp className="w-5 h-5 text-[#03EC86]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Likes</div>
                    <div className="text-lg font-bold text-gray-900">{(creator.total_likes / 1000).toFixed(1)}k</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-[#7E34FF]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Most Active Time</div>
                    <div className="text-lg font-bold text-gray-900">{creator.most_active_time}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-semibold text-gray-900">Growth Metrics</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatsTab('7d')}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                        statsTab === '7d' ? 'bg-[#7E34FF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      7 Days
                    </button>
                    <button
                      onClick={() => setStatsTab('30d')}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                        statsTab === '30d' ? 'bg-[#7E34FF] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      30 Days
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GrowthChart
                    data={subscriberData}
                    label="Subscriber Growth"
                    color="#10b981"
                    value={creator.subscribers.toLocaleString()}
                    change="+0.27%"
                  />
                  <GrowthChart
                    data={viewsData}
                    label="Views Growth"
                    color="#3b82f6"
                    value={creator.total_views.toLocaleString()}
                    change="+0.70%"
                  />
                </div>
              </div>
            </div>
          </div>

          {perks.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Gift className="w-6 h-6 text-[#7E34FF]" />
                <h2 className="text-xl font-bold text-gray-900">Holder Perks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {perks.map((perk) => {
                  const canClaim = userKeys >= perk.requirement_keys;
                  return (
                    <div
                      key={perk.id}
                      className={`rounded-xl p-5 border-2 transition-all ${
                        canClaim
                          ? 'bg-gradient-to-br from-purple-50 to-green-50 border-[#7E34FF] shadow-md'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`font-bold text-lg ${canClaim ? 'text-gray-900' : 'text-gray-400'}`}>
                          {perk.title}
                        </h3>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            canClaim ? 'bg-[#03EC86] text-white' : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {canClaim ? 'Unlocked' : 'Locked'}
                        </div>
                      </div>
                      <p className={`text-sm mb-4 ${canClaim ? 'text-gray-700' : 'text-gray-400'}`}>
                        {perk.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className={`text-xs font-medium ${canClaim ? 'text-[#7E34FF]' : 'text-gray-400'}`}>
                          Required: {perk.requirement_keys} Keys
                        </div>
                        <button
                          onClick={() => handleClaimPerk(perk)}
                          disabled={!canClaim}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                            canClaim
                              ? 'bg-[#7E34FF] text-white hover:bg-purple-700 hover:shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {canClaim ? 'Claim Perk' : 'Insufficient Keys'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trade Keys</h2>

            {isWalletConnected && userKeys > 0 && (
              <div className="mb-4 p-3 bg-gradient-to-r from-[#7E34FF] to-purple-600 rounded-lg">
                <div className="text-white text-sm font-medium">You hold</div>
                <div className="text-white text-2xl font-bold">{userKeys} Keys</div>
              </div>
            )}

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'buy' ? 'bg-[#03EC86] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sell
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'buy' ? 'Amount (SOL)' : 'Amount (Keys)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={!isWalletConnected}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#7E34FF] disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                {activeTab === 'sell' && (
                  <button
                    disabled={!isWalletConnected}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#7E34FF] text-white text-xs font-semibold rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Max
                  </button>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Key Price</span>
                <span className="font-semibold text-gray-900">{creator.key_price.toFixed(2)} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Amount</span>
                <span className="font-semibold text-gray-900">
                  {activeTab === 'buy' ? `${estimatedAmount} Keys` : `${estimatedAmount} SOL`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fees (2.5%)</span>
                <span className="font-semibold text-gray-900">{fees} SOL</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">
                  {amount ? (parseFloat(amount) + parseFloat(fees)).toFixed(3) : '0.000'} SOL
                </span>
              </div>
            </div>

            {!isWalletConnected ? (
              <button
                onClick={onBuyClick}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Connect Wallet to Trade
              </button>
            ) : (
              <button
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-3 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                }`}
              >
                {activeTab === 'buy' ? 'Buy Keys' : 'Sell Keys'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <YouTubeVideoList
          creatorId={creator.id}
          videos={videos.length > 0 ? videos : []}
          isLoading={videosLoading}
          error={videosError}
        />
      </div>

      <div className="mt-6">
        <Comments creatorId={creator.id} />
      </div>

      <button
        onClick={() => setShowMobileTradeKeys(!showMobileTradeKeys)}
        className="lg:hidden fixed bottom-6 right-6 z-50 px-6 py-3 bg-gradient-to-r from-[#7E34FF] to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
      >
        Trade Keys
      </button>

      {showMobileTradeKeys && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={() => setShowMobileTradeKeys(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Trade Keys</h2>
              <button
                onClick={() => setShowMobileTradeKeys(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {isWalletConnected && userKeys > 0 && (
              <div className="mb-4 p-3 bg-gradient-to-r from-[#7E34FF] to-purple-600 rounded-lg">
                <div className="text-white text-sm font-medium">You hold</div>
                <div className="text-white text-2xl font-bold">{userKeys} Keys</div>
              </div>
            )}

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'buy' ? 'bg-[#03EC86] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sell
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'buy' ? 'Amount (SOL)' : 'Amount (Keys)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                disabled={!isConnected}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#7E34FF] disabled:bg-gray-50"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Key Price</span>
                <span className="font-semibold text-gray-900">{creator.key_price.toFixed(2)} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Amount</span>
                <span className="font-semibold text-gray-900">
                  {activeTab === 'buy' ? `${estimatedAmount} Keys` : `${estimatedAmount} SOL`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fees (2.5%)</span>
                <span className="font-semibold text-gray-900">{fees} SOL</span>
              </div>
            </div>

            {!isWalletConnected ? (
              <button
                onClick={() => {
                  setShowMobileTradeKeys(false);
                  onConnectWallet();
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg"
              >
                Connect Wallet to Trade
              </button>
            ) : (
              <button
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-3 font-semibold rounded-lg transition-all disabled:opacity-50 ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                }`}
              >
                {activeTab === 'buy' ? 'Buy Keys' : 'Sell Keys'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
