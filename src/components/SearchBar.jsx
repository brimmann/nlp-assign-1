import React from "react";

const SearchBar = ({ query, setQuery, searchField, setSearchField }) => {
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <select
        value={searchField}
        onChange={handleFieldChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="title">Title</option>
        <option value="actor">Actor</option>
        <option value="director">Director</option>
        <option value="producer">Producer</option>
        <option value="writer">Writer</option>
        <option value="year">Year</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
        className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
