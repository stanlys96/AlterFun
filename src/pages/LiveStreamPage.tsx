import YouTube from "react-youtube";

export const LiveStreamPage = () => {
  const opts = {
    height: window.innerHeight * 0.9,
    width: window.innerWidth,
    playerVars: {
      autoplay: 1,
      origin: "https://thitsarparami.org/",
    },
  };
  return (
    <div>
      <YouTube videoId="4nQ2LT04reQ" opts={opts} />
    </div>
  );
};
