import { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet as WalletIcon,
  ExternalLink,
  Gift,
  Users,
} from "lucide-react";
import { supabase, Creator, Perk, Follow } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { WalletConnectionModal } from "../components";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";

type ProfileProps = {
  onNavigate: (page: string, slug?: string) => void;
};

type HoldingWithCreator = {
  id: string;
  keys_held: number;
  avg_buy_price: number;
  creator: Creator;
};

type PerkWithCreator = Perk & {
  creator_name: string;
  creator_slug: string;
};

type FollowWithCreator = Follow & {
  creator: Creator;
};

export const ProfilePage = ({ onNavigate }: ProfileProps) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, isWalletConnected, connectWallet, isAuthenticated } = useAuth();
  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey?.toBase58();
  const username = user?.username;
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [holdings, setHoldings] = useState<HoldingWithCreator[]>([]);
  const [perks, setPerks] = useState<PerkWithCreator[]>([]);
  const [following, setFollowing] = useState<FollowWithCreator[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);

  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(user?.profile_picture_url || "");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.email}.${fileExt}`;
      const filePath = `profile-pictures/${user?.email}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, file, { upsert: true });
      if (uploadError) {
        console.error(uploadError);
        return;
      }
      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;
      await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl },
      });
    }
  };

  useEffect(() => {
    if (publicKey?.toBase58()) {
      loadProfileData();
    } else {
      setHoldings([]);
      setTotalValue(0);
      setTotalPnL(0);
      setPerks([]);
    }
  }, [publicKey, connected]);

  const loadProfileData = async () => {
    if (!user) return;

    if (walletAddress) {
      const mockHoldings: HoldingWithCreator[] = [];

      const { data: creatorsData } = await supabase
        .from("creators")
        .select("*")
        .eq("enabled", true)
        .in("slug", ["miko-sakura", "aria-volt", "kira-neon"]);

      if (creatorsData) {
        creatorsData.forEach((creator, idx) => {
          const keysHeld = [150, 85, 200][idx];
          const avgBuyPrice = [7.2, 11.8, 5.5][idx];

          mockHoldings.push({
            id: `holding-${idx}`,
            keys_held: keysHeld,
            avg_buy_price: avgBuyPrice,
            creator,
          });
        });

        setHoldings(mockHoldings);

        let totalVal = 0;
        let totalProfit = 0;

        mockHoldings.forEach((holding) => {
          const currentValue = holding.keys_held * holding.creator.key_price;
          const costBasis = holding.keys_held * holding.avg_buy_price;
          totalVal += currentValue;
          totalProfit += currentValue - costBasis;
        });

        setTotalValue(totalVal);
        setTotalPnL(totalProfit);
      }

      const { data: userKeys } = await supabase
        .from("user_keys")
        .select("keys_held, creator_id")
        .eq("user_id", walletAddress);

      if (userKeys) {
        const creatorIds = userKeys.map((k) => k.creator_id);

        const { data: perksData } = await supabase
          .from("perks")
          .select("*, creators(name, slug)")
          .in("creator_id", creatorIds);

        if (perksData) {
          const eligiblePerks = perksData
            .filter((perk) => {
              const userKey = userKeys.find(
                (k) => k.creator_id === perk.creator_id
              );
              return userKey && userKey.keys_held >= perk.requirement_keys;
            })
            .map((perk) => ({
              ...perk,
              creator_name: (perk.creators as any).name,
              creator_slug: (perk.creators as any).slug,
            }));

          setPerks(eligiblePerks);
        }
      }
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

  const calculatePnL = (holding: HoldingWithCreator) => {
    const currentValue = holding.keys_held * holding.creator.key_price;
    const costBasis = holding.keys_held * holding.avg_buy_price;
    return currentValue - costBasis;
  };

  const calculatePnLPercent = (holding: HoldingWithCreator) => {
    const costBasis = holding.keys_held * holding.avg_buy_price;
    const pnl = calculatePnL(holding);
    return (pnl / costBasis) * 100;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    (async () => {
      if (publicKey?.toBase58()) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        await supabase.from("wallets").upsert(
          [
            {
              user_id: user?.id,
              address: publicKey?.toBase58(),
              chain: "solana",
              user_email: user?.email,
            },
          ],
          { onConflict: ["user_id", "address"] }
        );
      }
    })();
  }, [publicKey]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <WalletIcon className="w-5 h-5 text-[#7E34FF]" />
          Account Information
        </h2>
        <div className="space-y-3">
          <div className="flex gap-x-2 items-center">
            <div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <img
                onClick={() => fileInputRef.current.click()}
                src={profilePicturePreview || ""}
                alt={"WALAOEH"}
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 mb-1">Username</div>
              <div className="text-lg font-bold text-gray-900">
                {username || "Not set"}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Wallet Address</div>
            {isWalletConnected ? (
              <div className="flex items-center gap-3">
                <WalletMultiButton />
                <a
                  href={`https://solscan.io/account/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#7E34FF] text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Solscan
                </a>
              </div>
            ) : (
              <WalletMultiButton />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-600">
              Total Portfolio Value
            </h3>
          </div>
          <div className="text-4xl font-black mb-1 text-gray-900">
            {totalValue.toFixed(2)} SOL
          </div>
          <div className="text-sm text-gray-500">
            ≈ ${(totalValue * 95).toFixed(2)} USD
          </div>
        </div>

        <div
          className={`rounded-xl p-6 shadow-lg border-2 ${
            totalPnL >= 0
              ? "bg-white border-green-200"
              : "bg-white border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {totalPnL >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <h3 className="text-sm font-medium text-gray-600">Total P&L</h3>
          </div>
          <div
            className={`text-4xl font-black mb-1 ${
              totalPnL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}
            {totalPnL.toFixed(2)} SOL
          </div>
          <div
            className={`text-sm ${
              totalPnL >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}
            {((totalPnL / (totalValue - totalPnL)) * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">My Holdings</h2>
        </div>

        {holdings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">
              No holdings yet. Start trading to build your portfolio!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Creator
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Keys Held
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {holdings.map((holding) => {
                  const pnl = calculatePnL(holding);
                  const pnlPercent = calculatePnLPercent(holding);
                  const currentValue =
                    holding.keys_held * holding.creator.key_price;

                  return (
                    <tr
                      key={holding.id}
                      onClick={() =>
                        onNavigate("creator", holding.creator.slug)
                      }
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={holding.creator.avatar_url}
                            alt={holding.creator.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="font-semibold text-gray-900">
                            {holding.creator.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                        {holding.keys_held}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                        {holding.avg_buy_price.toFixed(2)} SOL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-medium">
                        {holding.creator.key_price.toFixed(2)} SOL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                        {currentValue.toFixed(2)} SOL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div
                          className={`font-bold ${
                            pnl >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {pnl >= 0 ? "+" : ""}
                          {pnl.toFixed(2)} SOL
                          <div className="text-xs">
                            ({pnl >= 0 ? "+" : ""}
                            {pnlPercent.toFixed(2)}%)
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#7E34FF]" />
            My Unlocked Perks
          </h2>
          {perks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No unlocked perks yet
            </p>
          ) : (
            <div className="space-y-3">
              {perks.map((perk) => (
                <div
                  key={perk.id}
                  className="p-4 bg-gradient-to-br from-purple-50 to-green-50 border-2 border-[#7E34FF] rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{perk.title}</h3>
                    <span className="px-2 py-1 bg-[#03EC86] text-white text-xs font-semibold rounded-full">
                      Unlocked
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {perk.description}
                  </p>
                  <button
                    onClick={() => onNavigate("creator", perk.creator_slug)}
                    className="text-sm text-[#7E34FF] hover:text-purple-700 font-medium"
                  >
                    From {perk.creator_name} →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#7E34FF]" />
            Following ({following.length})
          </h2>
          {following.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Not following any creators yet
            </p>
          ) : (
            <div className="space-y-3">
              {following.map((follow) => (
                <div
                  key={follow.id}
                  onClick={() => onNavigate("creator", follow.creator.slug)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <img
                    src={follow.creator.avatar_url}
                    alt={follow.creator.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {follow.creator.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(follow.creator.subscribers / 1000).toFixed(1)}k
                      subscribers
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showWalletModal && (
        <WalletConnectionModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />
      )}
    </div>
  );
};
