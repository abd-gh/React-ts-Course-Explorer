import { type } from "os";
import React, { useState } from "react";
import { createContext } from "react"
import './FilterBar.css';
import Search from "./Search";
import SortBy from "./SortBy";

export type SearchInput = {
    value: string | null
}
export type SortInput = {
    value: string | null
}

type searchContextType = {
    searchWord: SearchInput | null;
    setSearchWord: React.Dispatch<React.SetStateAction<SearchInput | null>>

    sortType: SortInput | null;
    setSortType:React.Dispatch<React.SetStateAction<SortInput | null>>
}

type SearchContextProviderProps = {
    children: React.ReactNode
}
export const SearchContext = createContext<searchContextType>({} as searchContextType)

const FilterBar = ({ children }: SearchContextProviderProps) => {
    const [searchWord, setSearchWord] = useState<SearchInput | null>(null)
    const [sortType, setSortType] = useState<SortInput | null>(null)
    return (
        <>
            <SearchContext.Provider value={{ searchWord, setSearchWord ,sortType,setSortType}}>
                <div className='filter-bar'>
                    <h1 className='filter-bar__right'>
                        Courses
                    </h1>
                    <div className='filter-bar__left'>
                        <Search />
                        <SortBy />
                    </div>
                </div>
                {children}
            </SearchContext.Provider>
        </>
    )
};

export default FilterBar;