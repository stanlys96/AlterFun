// services/RealtimeHoldersService.ts
export interface HolderData {
  address: string;
  balance: number;
  percentage: number;
}
export interface TokenSupplyInfo {
  totalSupply: number;
  circulatingSupply: number;
}
export class RealtimeHoldersService {
  private static subscriptions = new Map<string, any>();
  // Fetch holders from blockchain
  static async fetchHolders(tokenAddress: string): Promise<{
    holders: HolderData[];
    supplyInfo: TokenSupplyInfo;
  }> {
    try {
      // Use Helius or similar API to fetch holder data
      const response = await fetch(
        `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mintAccounts: [tokenAddress],
          }),
        }
      );
      const data = await response.json();
      // Process and sort holders
      const holders = data.holders
        .sort((a, b) => b.balance - a.balance)
        .map((h) => ({
          address: h.owner,
          balance: h.amount,
          percentage: (h.amount / data.supply) * 100,
        }));
      return {
        holders,
        supplyInfo: {
          totalSupply: data.supply,
          circulatingSupply: data.supply,
        },
      };
    } catch (error) {
      console.error("Error fetching holders:", error);
      return {
        holders: [],
        supplyInfo: { totalSupply: 0, circulatingSupply: 0 },
      };
    }
  }
  // Subscribe to real-time updates
  static subscribeToHolderUpdates(
    tokenAddress: string,
    callback: (data: { holders: HolderData[] }) => void
  ): () => void {
    const intervalId = setInterval(async () => {
      const { holders } = await this.fetchHolders(tokenAddress);
      callback({ holders });
    }, 30000); // Update every 30 seconds
    this.subscriptions.set(tokenAddress, intervalId); // Return unsubscribe function
    return () => {
      clearInterval(intervalId);
      this.subscriptions.delete(tokenAddress);
    };
  }
}
