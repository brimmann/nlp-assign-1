import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
  if (videos.length === 0) {
    return <p className="text-center text-gray-600">No results found.</p>;
  }

  // Changed grid to a single column layout.
  return (
    <div className="grid grid-cols-1 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
