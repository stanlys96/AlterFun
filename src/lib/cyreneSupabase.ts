// lib/supabase.ts - Updated with stream redirection support
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_CYRENE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_CYRENE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const cyreneSupabase = createClient(supabaseUrl, supabaseAnonKey);

// Team Member Types
export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  walletAddress: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  bio?: string;
  profileImage?: string;
}

// Project Idea Types - Updated to match database schema with social media
export interface ProjectIdeaDB {
  id: string;
  wallet_address: string;
  project_name: string;
  project_description: string;
  project_category: string;
  project_industry: string;
  project_image?: string | null;
  github_url?: string | null;
  website_url?: string | null;
  whitepaper_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  project_stage: "ideation" | "cooking";
  team_members: TeamMember[];
  token_name?: string | null;
  token_symbol?: string | null;
  total_token_supply: number;
  migration_quote_threshold: number;
  quote_mint: string;
  enable_first_buy: boolean;
  first_buy_amount_sol: number;
  minimum_tokens_out: number;
  trade_status: boolean;
  is_launched: boolean;
  launched_token_id?: string | null;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verified_by?: string | null;
  verified_at?: string | null;
}

export interface ProjectIdeaData {
  id?: string;
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  projectIndustry: string;
  projectImage?: string;
  githubUrl?: string;
  websiteUrl?: string;
  whitepaperUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  projectStage: "ideation" | "cooking";
  teamMembers: TeamMember[];
  tokenName?: string;
  tokenSymbol?: string;
  totalTokenSupply: number;
  migrationQuoteThreshold: number;
  quoteMint: string;
  enableFirstBuy: boolean;
  firstBuyAmountSol: number;
  minimumTokensOut: number;
  tradeStatus: boolean;
  isLaunched: boolean;
  launchedTokenId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

// Updated launched token types with hidden support and createdBy
export interface LaunchedTokenDB {
  id: string;
  wallet_address: string;
  contract_address: string;
  dbc_pool_address: string;
  config_address: string;
  quote_mint: "SOL" | "CYAI";
  token_name: string;
  token_symbol: string;
  damm_pool_address: string | null;
  metadata_uri: string | null;
  trade_status: boolean;
  is_hidden: boolean;
  launched_at: number;
  project_idea_id: string | null;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verified_by?: string | null;
  verified_at?: string | null;
}

export interface LaunchedTokenData {
  contractAddress: string;
  dbcPoolAddress: string;
  configAddress: string;
  quoteMint: "SOL" | "CYAI";
  tokenName: string;
  tokenSymbol: string;
  dammPoolAddress?: string;
  metadataUri?: string;
  tradeStatus: boolean;
  isHidden: boolean;
  launchedAt: number;
  projectIdeaId?: string;
  createdBy?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

// Stream Management Types
export interface ProjectStreamDB {
  id: string;
  project_id: string;
  project_type: "idea" | "token";
  wallet_address: string;
  stream_url: string;
  stream_key: string;
  status: "live" | "offline";
  title?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectStreamData {
  id: string;
  projectId: string;
  projectType: "idea" | "token";
  walletAddress: string;
  streamUrl: string;
  streamKey: string;
  status: "live" | "offline";
  title?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  redirections?: StreamRedirectionData[]; // Include redirections when fetching
}

// NEW: Stream Redirection Types
export interface StreamRedirectionDB {
  id: string;
  project_id: string;
  project_type: "idea" | "token";
  wallet_address: string;
  platform_name: string;
  platform_stream_url: string;
  platform_stream_key: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface StreamRedirectionData {
  id?: string;
  projectId: string;
  projectType: "idea" | "token";
  walletAddress: string;
  platformName: string;
  platformStreamUrl: string;
  platformStreamKey: string;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Convert functions for launched tokens
export const dbToFrontend = (dbToken: LaunchedTokenDB): LaunchedTokenData => ({
  contractAddress: dbToken.contract_address,
  dbcPoolAddress: dbToken.dbc_pool_address,
  configAddress: dbToken.config_address,
  quoteMint: dbToken.quote_mint,
  tokenName: dbToken.token_name,
  tokenSymbol: dbToken.token_symbol,
  dammPoolAddress: dbToken.damm_pool_address || undefined,
  metadataUri: dbToken.metadata_uri || undefined,
  tradeStatus: dbToken.trade_status,
  isHidden: dbToken.is_hidden,
  launchedAt: dbToken.launched_at,
  projectIdeaId: dbToken.project_idea_id || undefined,
  createdBy: dbToken.wallet_address,
  isVerified: dbToken.is_verified,
  verifiedBy: dbToken.verified_by || undefined,
  verifiedAt: dbToken.verified_at || undefined,
});

export const frontendToDb = (
  token: LaunchedTokenData,
  walletAddress: string
): Omit<LaunchedTokenDB, "id" | "created_at" | "updated_at"> => ({
  wallet_address: walletAddress,
  contract_address: token.contractAddress,
  dbc_pool_address: token.dbcPoolAddress,
  config_address: token.configAddress,
  quote_mint: token.quoteMint,
  token_name: token.tokenName,
  token_symbol: token.tokenSymbol,
  damm_pool_address: token.dammPoolAddress || null,
  metadata_uri: token.metadataUri || null,
  trade_status: token.tradeStatus,
  is_hidden: token.isHidden,
  launched_at: token.launchedAt,
  project_idea_id: token.projectIdeaId || null,
  is_verified: token.isVerified,
  verified_by: token.verifiedBy || null,
  verified_at: token.verifiedAt || null,
});

// Convert functions for Project Ideas
export const projectIdeaDbToFrontend = (
  dbIdea: ProjectIdeaDB
): ProjectIdeaData => ({
  id: dbIdea.id,
  projectName: dbIdea.project_name,
  projectDescription: dbIdea.project_description,
  projectCategory: dbIdea.project_category,
  projectIndustry: dbIdea.project_industry,
  projectImage: dbIdea.project_image || undefined,
  githubUrl: dbIdea.github_url || undefined,
  websiteUrl: dbIdea.website_url || undefined,
  whitepaperUrl: dbIdea.whitepaper_url || undefined,
  twitterUrl: dbIdea.twitter_url || undefined,
  instagramUrl: dbIdea.instagram_url || undefined,
  linkedinUrl: dbIdea.linkedin_url || undefined,
  projectStage: dbIdea.project_stage,
  teamMembers: dbIdea.team_members || [],
  tokenName: dbIdea.token_name || undefined,
  tokenSymbol: dbIdea.token_symbol || undefined,
  totalTokenSupply: dbIdea.total_token_supply,
  migrationQuoteThreshold: dbIdea.migration_quote_threshold,
  quoteMint: dbIdea.quote_mint,
  enableFirstBuy: dbIdea.enable_first_buy,
  firstBuyAmountSol: dbIdea.first_buy_amount_sol,
  minimumTokensOut: dbIdea.minimum_tokens_out,
  tradeStatus: dbIdea.trade_status,
  isLaunched: dbIdea.is_launched,
  launchedTokenId: dbIdea.launched_token_id || undefined,
  createdBy: dbIdea.wallet_address,
  createdAt: dbIdea.created_at,
  updatedAt: dbIdea.updated_at,
  isVerified: dbIdea.is_verified,
  verifiedBy: dbIdea.verified_by || undefined,
  verifiedAt: dbIdea.verified_at || undefined,
});

export const projectIdeaFrontendToDb = (
  idea: ProjectIdeaData,
  walletAddress: string
): Omit<ProjectIdeaDB, "id" | "created_at" | "updated_at"> => ({
  wallet_address: walletAddress,
  project_name: idea.projectName,
  project_description: idea.projectDescription,
  project_category: idea.projectCategory,
  project_industry: idea.projectIndustry,
  project_image: idea.projectImage || null,
  github_url: idea.githubUrl || null,
  website_url: idea.websiteUrl || null,
  whitepaper_url: idea.whitepaperUrl || null,
  twitter_url: idea.twitterUrl || null,
  instagram_url: idea.instagramUrl || null,
  linkedin_url: idea.linkedinUrl || null,
  project_stage: idea.projectStage,
  team_members: idea.teamMembers,
  token_name: idea.tokenName || null,
  token_symbol: idea.tokenSymbol || null,
  total_token_supply: idea.totalTokenSupply,
  migration_quote_threshold: idea.migrationQuoteThreshold,
  quote_mint: idea.quoteMint,
  enable_first_buy: idea.enableFirstBuy,
  first_buy_amount_sol: idea.firstBuyAmountSol,
  minimum_tokens_out: idea.minimumTokensOut,
  trade_status: idea.tradeStatus,
  is_launched: idea.isLaunched,
  launched_token_id: idea.launchedTokenId || null,
  is_verified: idea.isVerified || false,
  verified_by: idea.verifiedBy || null,
  verified_at: idea.verifiedAt || null,
});

// NEW: Convert functions for Stream Redirections
export const streamRedirectionDbToFrontend = (
  dbRedirection: StreamRedirectionDB
): StreamRedirectionData => ({
  id: dbRedirection.id,
  projectId: dbRedirection.project_id,
  projectType: dbRedirection.project_type,
  walletAddress: dbRedirection.wallet_address,
  platformName: dbRedirection.platform_name,
  platformStreamUrl: dbRedirection.platform_stream_url,
  platformStreamKey: dbRedirection.platform_stream_key,
  isEnabled: dbRedirection.is_enabled,
  createdAt: dbRedirection.created_at,
  updatedAt: dbRedirection.updated_at,
});

export const streamRedirectionFrontendToDb = (
  redirection: StreamRedirectionData,
  walletAddress: string
): Omit<StreamRedirectionDB, "id" | "created_at" | "updated_at"> => ({
  project_id: redirection.projectId,
  project_type: redirection.projectType,
  wallet_address: walletAddress,
  platform_name: redirection.platformName,
  platform_stream_url: redirection.platformStreamUrl,
  platform_stream_key: redirection.platformStreamKey,
  is_enabled: redirection.isEnabled,
});

// Convert functions for Project Streams (updated to include redirections)
export const projectStreamDbToFrontend = (
  dbStream: ProjectStreamDB,
  redirections: StreamRedirectionData[] = []
): ProjectStreamData => ({
  id: dbStream.id,
  projectId: dbStream.project_id,
  projectType: dbStream.project_type,
  walletAddress: dbStream.wallet_address,
  streamUrl: dbStream.stream_url,
  streamKey: dbStream.stream_key,
  status: dbStream.status,
  title: dbStream.title,
  description: dbStream.description,
  createdAt: dbStream.created_at,
  updatedAt: dbStream.updated_at,
  redirections,
});

export const projectStreamFrontendToDb = (
  stream: ProjectStreamData,
  walletAddress: string
): Omit<ProjectStreamDB, "id" | "created_at" | "updated_at"> => ({
  project_id: stream.projectId,
  project_type: stream.projectType,
  wallet_address: walletAddress,
  stream_url: stream.streamUrl,
  stream_key: stream.streamKey,
  status: stream.status,
  title: stream.title,
  description: stream.description,
});

// Category and Industry types
export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
}

export interface ProjectIndustry {
  id: number;
  name: string;
  description: string;
}

// NEW: Stream Redirection API Helper Functions
export const streamRedirectionHelpers = {
  // Get all redirections for a project
  async getProjectRedirections(
    projectId: string,
    projectType: "idea" | "token"
  ): Promise<StreamRedirectionData[]> {
    const { data, error } = await cyreneSupabase
      .from("stream_redirections")
      .select("*")
      .eq("project_id", projectId)
      .eq("project_type", projectType)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data?.map(streamRedirectionDbToFrontend) || [];
  },

  // Create a new stream redirection
  async createRedirection(
    redirection: StreamRedirectionData,
    walletAddress: string
  ): Promise<StreamRedirectionData> {
    const dbRedirection = streamRedirectionFrontendToDb(
      redirection,
      walletAddress
    );

    const { data, error } = await cyreneSupabase
      .from("stream_redirections")
      .insert(dbRedirection)
      .select()
      .single();

    if (error) throw error;
    return streamRedirectionDbToFrontend(data);
  },

  // Update a stream redirection
  async updateRedirection(
    id: string,
    updates: Partial<StreamRedirectionData>
  ): Promise<StreamRedirectionData> {
    const { data, error } = await cyreneSupabase
      .from("stream_redirections")
      .update({
        platform_name: updates.platformName,
        platform_stream_url: updates.platformStreamUrl,
        platform_stream_key: updates.platformStreamKey,
        is_enabled: updates.isEnabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return streamRedirectionDbToFrontend(data);
  },

  // Delete a stream redirection
  async deleteRedirection(id: string): Promise<void> {
    const { error } = await cyreneSupabase
      .from("stream_redirections")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Toggle redirection enable/disable
  async toggleRedirection(
    id: string,
    isEnabled: boolean
  ): Promise<StreamRedirectionData> {
    const { data, error } = await cyreneSupabase
      .from("stream_redirections")
      .update({
        is_enabled: isEnabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return streamRedirectionDbToFrontend(data);
  },
};
