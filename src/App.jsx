import { useState } from "react";
import SearchBar from "./components/SearchBar";
import leven from "leven";
import VideoList from "./components/VideoList";
import { videoData } from "./data";

const threshold = 3; // acceptable Levenshtein distance threshold

const App = () => {
  const [query, setQuery] = useState("");
  const [searchField, setSearchField] = useState("title"); // default is fuzzy title search

  // Filtering logic based on selected searchField.
  const filteredVideos = videoData.filter((video) => {
    const userQuery = query.toLowerCase().trim();
    if (userQuery === "") return true; // if blank, show all

    if (searchField === "title") {
      // Fuzzy search for title using Levenshtein.
      const storedName = video.dramaName.toLowerCase();
      const distance = leven(userQuery, storedName);
      console.log(
        `Comparing "${userQuery}" with "${storedName}" => Distance: ${distance}`
      );
      return distance <= threshold || storedName.includes(userQuery);
    } else {
      // For other fields, use simple case-insensitive substring match.
      const fieldValue = String(video[searchField]).toLowerCase();
      return fieldValue.includes(userQuery);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Drama Video Search
        </h1>
        <SearchBar
          query={query}
          setQuery={setQuery}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <VideoList videos={filteredVideos} />
      </div>
    </div>
  );
};

export default App;
