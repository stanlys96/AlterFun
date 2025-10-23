import { HeroBanner, LiveStreaming, MarketDiscovery } from "../components";

type HomePageProps = {
  handleNavigate: (page: string, slugOrEmail?: string) => void;
};

export const HomePage = ({ handleNavigate }: HomePageProps) => {
  return (
    <>
      <HeroBanner />
      <LiveStreaming onNavigate={handleNavigate} />
      <MarketDiscovery onNavigate={handleNavigate} />
    </>
  );
};
