import { useState, useEffect } from "react";
import {
  cyreneSupabase,
  LaunchedTokenData,
  dbToFrontend,
} from "../lib/cyreneSupabase";
import { combineTokensAndIdeas } from "../utils/utils";

export const useLaunchedTokens = () => {
  const [tokens, setTokens] = useState<LaunchedTokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCookingTokens();
  }, []);

  const fetchCookingTokens = async () => {
    try {
      setLoading(true);
      const { data, error } = await cyreneSupabase
        .from("launched_tokens")
        .select(
          `*, 
            project_ideas!project_idea_id (
            *
          )`
        )
        .eq("is_hidden", false)
        .eq("project_ideas.project_stage", "cooking")
        .order("created_at", { ascending: false });
      const { data: projectData, error: projectError } = await cyreneSupabase
        .from("project_ideas")
        .select("*");
      const combinedData = combineTokensAndIdeas(data, projectData);
      if (error) throw error;
      if (projectError) throw projectError;
      const formattedTokens =
        combinedData?.map((token) => dbToFrontend(token)) || [];
      setTokens(formattedTokens);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  return { tokens, loading, error, refetch: fetchCookingTokens };
};
