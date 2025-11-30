import { useState } from "react";
import { TalentDirectory, TalentDetail } from "../components";

interface Talent {
  id: number;
  name: string;
  image: string;
  isLive: boolean;
  chapter: string;
  generation: string;
}

export function TalentsPage() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  if (selectedTalent) {
    return (
      <TalentDetail
        talent={selectedTalent}
        onBack={() => setSelectedTalent(null)}
      />
    );
  }

  return <TalentDirectory onSelectTalent={setSelectedTalent} />;
}
