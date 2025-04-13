import React from "react";

const VideoCard = ({ video }) => {
  return (
    // Using flex to have a horizontal layout (card takes the full row)
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row">
      <img
        src={video.thumbnail}
        alt={video.dramaName}
        // Full width for mobile, fixed width on medium+ screens
        className="w-full h-48 object-cover md:w-48"
      />
      <div className="p-4 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">{video.dramaName}</h2>
          <p className="text-gray-600">Year: {video.year}</p>
          <p className="text-gray-600">Actor: {video.actor}</p>
          <p className="text-gray-600">Director: {video.director}</p>
        </div>
      </div>
      <div className="s self-end ml-auto pb-4 pr-4">
        <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Watch on YouTube
          </button>
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
