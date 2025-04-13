import { useState } from "react";
import SearchBar from "./components/SearchBar";
import leven from "leven";
import VideoList from "./components/VideoList";
import { videoData } from "./data";

const threshold = 3; // acceptable Levenshtein distance threshold

const App = () => {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null); // { field: 'actor', value: 'Mahira Khan' }

  const handleTagClick = (field, value) => {
    setQuery(""); // clear manual query if tag is selected
    setTagFilter({ field, value });
    console.log(`Tag clicked: Field: ${field}, Value: ${value}`);
  };

  // If tagFilter is active, filter by that exact field; otherwise use fuzzy drama name filtering.
  const filteredVideos = videoData.filter((video) => {
    if (tagFilter) {
      return (
        String(video[tagFilter.field]).toLowerCase() ===
        String(tagFilter.value).toLowerCase()
      );
    } else {
      const storedName = video.dramaName.toLowerCase();
      const userQuery = query.toLowerCase().trim();
      if (userQuery === "") return true;
      const distance = leven(userQuery, storedName);
      console.log(
        `Comparing "${userQuery}" with "${storedName}" => Distance: ${distance}`
      );
      return distance <= threshold || storedName.includes(userQuery);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Drama Video Search
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
        {tagFilter && (
          <div className="mb-4 text-center">
            <p className="text-gray-700">
              Filtering by {tagFilter.field}:{" "}
              <span className="font-bold">{tagFilter.value}</span>
            </p>
            <button
              onClick={() => setTagFilter(null)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2"
            >
              Clear Filter
            </button>
          </div>
        )}
        <VideoList videos={filteredVideos} onTagClick={handleTagClick} />
      </div>
    </div>
  );
};

export default App;
