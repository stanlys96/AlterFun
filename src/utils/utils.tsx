type LaunchedToken = {
  token_symbol: string;
  [key: string]: any;
  project_ideas: any;
};
type ProjectIdea = {
  token_symbol: string;
  launched_token_id: string;
  [key: string]: any;
};

/**
 * Combines two arrays of objects based on a shared token_symbol.
 * It merges the matching project_idea object into the launched_token object.
 * * @param launchedTokens The first array of objects (e.g., from 'launched_tokens').
 * @param projectIdeas The second array of objects (e.g., from 'project_ideas').
 * @returns An array of the combined objects.
 */
export function combineTokensAndIdeas(
  launchedTokens: LaunchedToken[],
  projectIdeas: ProjectIdea[]
): LaunchedToken[] {
  // 1. Create a map for quick lookup of project ideas by their launched_token_id
  const ideaMap = new Map<string, Omit<ProjectIdea, "launched_token_id">>();

  for (const idea of projectIdeas) {
    if (idea.launched_token_id) {
      // Spread the idea object, but omit the launched_token_id to prevent redundancy
      // as this ID is already the key for the lookup
      const { launched_token_id, ...ideaData } = idea;
      ideaMap.set(launched_token_id, ideaData);
    }
  }

  // 2. Iterate through launched tokens and merge the matching project idea
  const combinedData: LaunchedToken[] = launchedTokens.map((token) => {
    // We'll use the 'id' from the first array which matches the 'launched_token_id' in the second
    const matchingIdea = ideaMap.get(token.id);

    // If a matching idea is found, merge it into the 'project_ideas' key.
    if (matchingIdea) {
      // Create a shallow copy of the token and update the project_ideas property
      return {
        ...token,
        project_ideas: matchingIdea,
      };
    }

    // If no match is found, return the original token object
    return token;
  });

  return combinedData;
}

export function formatNumber(num: number): string {
  if (num < 1000) return num?.toString();

  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let scaled = num;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  // Keep one decimal if needed
  const formatted = scaled % 1 === 0 ? scaled?.toFixed(0) : scaled?.toFixed(1);

  return `${formatted}${units[unitIndex]}`;
}
