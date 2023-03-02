import { type } from "os";
import React, { useState } from "react";
import { createContext } from "react";
import "./FilterBar.css";
import { SearchContextType } from "./FilterModels";
import Search from "./Search";
import SortBy from "./SortBy";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

const FilterBar = ({ children }: SearchContextProviderProps) => {
  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string | null>(null);

  return (
      <SearchContext.Provider
        value={{ searchWord, setSearchWord, sortType, setSortType }}
      >
        <div className="filter-bar">
          <h1 className="filter-bar__right">Courses</h1>
          <div className="filter-bar__left">
            <Search />
            <SortBy />
          </div>
        </div>
        {children}
      </SearchContext.Provider>
  );
};

export default FilterBar;
