import React, { useContext, useState } from "react";
import { SearchContext } from "./FilterBar";
import "./Search.css";

const Search = () => {
  const searchInput = useContext(SearchContext);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value || null;
    searchInput.setSearchWord(val);
  };
  return (
    <div className="search-field">
      <p>Search</p>
      <input className="search-input" onChange={inputHandler} type="text" />
    </div>
  );
};

export default Search;
