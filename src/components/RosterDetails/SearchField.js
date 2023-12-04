import React, { useState } from "react";
import search from "../../images/search.svg"
const SearchField = ({ value, onChange, onSearch, onCancel }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(value); // Pass the current value to onSearch
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleClear = () => {
    onChange("");
    onCancel();
  };

  return (
    <div className="search-box">
      <img src={search} alt="" />
      <input
        type="text"
        placeholder="Find Player"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {value && (
        <button type="button" onClick={handleClear}>
          x
        </button>
      )}
    </div>
  );
};

export default SearchField;
