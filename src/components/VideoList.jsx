import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos, onTagClick }) => {
  if (videos.length === 0) {
    return <p className="text-center text-gray-600">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onTagClick={onTagClick} />
      ))}
    </div>
  );
};

export default VideoList;
