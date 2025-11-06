// services/tokenDataService.ts
import axios from "axios";
// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds
function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}
function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}
// Fetch token data from DexScreener
export async function fetchDexScreenerData(tokenAddress: string) {
  const cacheKey = `dexscreener-${tokenAddress}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;
  try {
    const response = await axios.get(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      { timeout: 10000 }
    );
    if (response.data.pairs && response.data.pairs.length > 0) {
      const bestPair = response.data.pairs.reduce((best, current) => {
        const bestLiq = best.liquidity?.usd || 0;
        const currentLiq = current.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      });
      setCachedData(cacheKey, bestPair);
      return bestPair;
    }
    return null;
  } catch (error) {
    console.error("Error fetching DexScreener data:", error);
    return null;
  }
}
// Fetch token metadata from IPFS
export async function fetchTokenData(metadataUri: string) {
  const cacheKey = `metadata-${metadataUri}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;
  try {
    let url = metadataUri;
    if (metadataUri.startsWith("ipfs://")) {
      url = metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    const response = await axios.get(url, { timeout: 10000 });
    const metadata = response.data;
    if (metadata.image?.startsWith("ipfs://")) {
      metadata.image = metadata.image.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
    }
    setCachedData(cacheKey, metadata);
    return metadata;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return null;
  }
}
// Validate token address
export async function validateTokenAddress(tokenAddress: string) {
  try {
    const data = await fetchDexScreenerData(tokenAddress);
    return data !== null;
  } catch {
    return false;
  }
}
