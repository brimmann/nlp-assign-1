import { useState } from "react";
import SearchBar from "./components/SearchBar";
import leven from "leven";
import VideoList from "./components/VideoList";
import { videoData } from "./data";

const threshold = 3; // acceptable Levenshtein distance threshold

const App = () => {
  const [query, setQuery] = useState("");
  const [searchField, setSearchField] = useState("title"); // default search field
  const [tagFilter, setTagFilter] = useState(null); // e.g., { field: "actor", value: "Mahira Khan" }

  // When a tag is clicked, set the tag filter.
  const handleTagClick = (field, value) => {
    setTagFilter({ field, value });
    // Optionally clear the free-form query.
    setQuery("");
  };

  const clearTagFilter = () => {
    setTagFilter(null);
  };

  // Filtering logic:
  // - If a tag filter is active, filter videos by that field using case-insensitive exact matching.
  // - Otherwise, for free-form search use:
  //     - Levenshtein fuzzy matching for text fields (e.g. title, actor, director, etc.)
  //     - Regular substring matching for "year".
  const filteredVideos = videoData.filter((video) => {
    if (tagFilter) {
      // Convert both values to string and to lower-case for a clean comparison.
      const fieldVal = String(video[tagFilter.field]).toLowerCase();
      const tagVal = tagFilter.value.toLowerCase();
      return fieldVal === tagVal;
    } else {
      const userQuery = query.toLowerCase().trim();
      if (userQuery === "") return true; // if blank, show all

      let storedValue = "";
      if (searchField === "title") {
        storedValue = video.dramaName.toLowerCase();
      } else {
        storedValue = String(video[searchField]).toLowerCase();
      }

      // For "year", skip the fuzzy search and do regular matching.
      if (searchField === "year") {
        console.log(
          `Regular matching for year: comparing "${userQuery}" with "${storedValue}"`
        );
        return storedValue.includes(userQuery);
      } else {
        // For other fields, use fuzzy matching.
        const distance = leven(userQuery, storedValue);
        console.log(
          `Comparing "${userQuery}" with "${storedValue}" in field '${searchField}' => Distance: ${distance}`
        );
        return distance <= threshold || storedValue.includes(userQuery);
      }
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
        {tagFilter && (
          <div className="mb-4 text-center">
            <p className="text-gray-700">
              Filtering by <strong>{tagFilter.field}</strong>:{" "}
              <span className="font-bold">{tagFilter.value}</span>
            </p>
            <button
              onClick={clearTagFilter}
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
