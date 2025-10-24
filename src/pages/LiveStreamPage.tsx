import YouTube from "react-youtube";

export const LiveStreamPage = () => {
  const opts = {
    height: window.innerHeight * 0.9,
    width: window.innerWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      origin: "https://thitsarparami.org/",
    },
  };
  const containerStyle = {
    // Set height to 100% of the viewport height
    // Often you want to remove any body/root margin/padding that might cause a scrollbar
    // This is usually done in global CSS (e.g., App.css or index.css)
  };
  return (
    <div style={containerStyle}>
      <YouTube videoId="4nQ2LT04reQ" opts={opts} />
    </div>
  );
};
