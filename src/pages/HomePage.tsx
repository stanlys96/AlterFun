import {
  Hero,
  LiveAction,
  PrimeMembership,
  BountyBoard,
  Vision,
  Footer,
} from "../components";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <LiveAction />
      <PrimeMembership />
      {/* <BountyBoard isHomepage={true} /> */}
      <Vision />
      <Footer />
    </>
  );
};
