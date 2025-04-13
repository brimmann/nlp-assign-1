import { useState } from "react";
import SearchBar from "./components/SearchBar";
import leven from "leven";
import VideoList from "./components/VideoList";
import { videoData } from "./data";

const threshold = 3; // acceptable Levenshtein distance threshold

const App = () => {
  const [query, setQuery] = useState("");

  // Filter videos based on user's query, and log the distance for each video.
  const filteredVideos = videoData.filter((video) => {
    const storedName = video.dramaName.toLowerCase();
    const userQuery = query.toLowerCase().trim();

    // If the search box is empty, just show all videos.
    if (userQuery === "") return true;

    // Calculate the Levenshtein distance between query and stored drama name.
    const distance = leven(userQuery, storedName);

    // Log the distance so people can see what's going on.
    console.log(
      `Comparing "${userQuery}" with "${storedName}" => Distance: ${distance}`
    );

    // Return true if the distance is within threshold or the stored name includes the query.
    return distance <= threshold || storedName.includes(userQuery);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Drama Video Search
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
        <VideoList videos={filteredVideos} />
      </div>
    </div>
  );
};

export default App;
