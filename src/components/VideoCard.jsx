import React from "react";

const VideoCard = ({ video, onTagClick }) => {
  // Build tags for each searchable field.
  const tags = [
    { label: video.dramaName, field: "dramaName" },
    { label: video.year, field: "year" },
    { label: video.actor, field: "actor" },
    { label: video.director, field: "director" },
    { label: video.producer, field: "producer" },
    { label: video.writer, field: "writer" },
  ];

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row">
      <img
        src={video.thumbnail}
        alt={video.dramaName}
        className="w-full h-48 object-cover md:w-48 md:h-full max-h-[220px]"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">{video.dramaName}</h2>
          <p className="text-gray-600">Year: {video.year}</p>
          <p className="text-gray-600">Actor: {video.actor}</p>
          <p className="text-gray-600">Director: {video.director}</p>
          {/* Display clickable tags */}
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag.field, tag.label)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded text-sm"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Watch on YouTube
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
