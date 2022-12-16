import React, { useContext, useState } from "react";
import { SearchContext, SearchInput } from "./FilterBar";
import './Search.css';

const Search=()=>{
    
const searchInput=useContext(SearchContext);

const inputHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
searchInput.setSearchWord({...searchInput,value:event.target.value}as SearchInput)
}
return(
    <div className="search-field">
        <p>Search</p>
        <input className="search-input" onChange={inputHandler} type="text" />
    </div>
)
}

export default Search;