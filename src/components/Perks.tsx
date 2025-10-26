import { useState, useEffect } from "react";
import { Gift, CheckCircle, Clock, Award } from "lucide-react";
import { supabase, Perk, Creator } from "../lib/supabase";

type PerkWithCreator = Perk & {
  creator: Creator;
  userHoldings: number;
  isAvailable: boolean;
  isClaimed: boolean;
};

export default function Perks() {
  const [perks, setPerks] = useState<PerkWithCreator[]>([]);

  useEffect(() => {
    loadPerks();
  }, []);

  const loadPerks = async () => {
    const { data: allPerks } = await supabase
      .from("perks")
      .select("*, creators(*)");

    if (allPerks) {
      const mockHoldings: Record<string, number> = {
        "miko-sakura": 150,
        "aria-volt": 85,
        "kira-neon": 200,
      };

      const enrichedPerks: PerkWithCreator[] = allPerks.map((perk: any) => {
        const creator = perk.creators;
        const holdings = mockHoldings[creator.slug] || 0;
        const isAvailable = holdings >= perk.requirement_keys;

        return {
          ...perk,
          creator,
          userHoldings: holdings,
          isAvailable,
          isClaimed: false,
        };
      });

      setPerks(enrichedPerks);
    }
  };

  const handleClaim = (perkId: string) => {
    setPerks(
      perks.map((perk) =>
        perk.id === perkId ? { ...perk, isClaimed: true } : perk
      )
    );
  };

  const availablePerks = perks.filter((p) => p.isAvailable && !p.isClaimed);
  const claimedPerks = perks.filter((p) => p.isClaimed);
  const lockedPerks = perks.filter((p) => !p.isAvailable);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Perks
        </h1>
        <p className="text-gray-600">
          Claim and manage your exclusive creator perks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-[#03EC86]" />
            <h3 className="font-semibold text-gray-900">Available</h3>
          </div>
          <div className="text-3xl font-black text-[#03EC86]">
            {availablePerks.length}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-[#7E34FF]" />
            <h3 className="font-semibold text-gray-900">Claimed</h3>
          </div>
          <div className="text-3xl font-black text-[#7E34FF]">
            {claimedPerks.length}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Locked</h3>
          </div>
          <div className="text-3xl font-black text-gray-500">
            {lockedPerks.length}
          </div>
        </div>
      </div>

      {availablePerks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available to Claim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePerks.map((perk) => (
              <div key={perk.id} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={perk.creator.avatar_url}
                    alt={perk.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {perk.creator.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {perk.userHoldings} Keys held
                    </div>
                  </div>
                  <Award className="w-6 h-6 text-[#03EC86]" />
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{perk.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-[#03EC86]">
                    Requires {perk.requirement_keys} Keys
                  </div>
                  <button
                    onClick={() => handleClaim(perk.id)}
                    className="px-4 py-2 bg-[#03EC86] text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Claim Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {claimedPerks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Claimed Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {claimedPerks.map((perk) => (
              <div key={perk.id} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={perk.creator.avatar_url}
                    alt={perk.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {perk.creator.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {perk.userHoldings} Keys held
                    </div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-[#7E34FF]" />
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{perk.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-[#7E34FF]">
                    Claimed
                  </div>
                  <button className="px-4 py-2 bg-[#7E34FF] text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedPerks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Locked Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedPerks.map((perk) => (
              <div
                key={perk.id}
                className="bg-white rounded-xl p-6 shadow-md opacity-60"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={perk.creator.avatar_url}
                    alt={perk.creator.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {perk.creator.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {perk.userHoldings} / {perk.requirement_keys} Keys
                    </div>
                  </div>
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{perk.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-600">
                    Need {perk.requirement_keys - perk.userHoldings} more Keys
                  </div>
                  <button className="px-4 py-2 bg-gray-300 text-gray-600 text-sm font-semibold rounded-lg cursor-not-allowed">
                    Locked
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
