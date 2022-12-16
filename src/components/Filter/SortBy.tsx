import React, { useContext } from "react";
import { SearchContext, SortInput } from "./FilterBar";
import './SortBy.css';

const SortBy=()=>{

    const sortSelected=useContext(SearchContext);

    const sortSelectHandler=(event: React.ChangeEvent<HTMLSelectElement>)=>{  
        sortSelected.setSortType({...sortSelected,value:event.target.value}as SortInput)
    }

return(
<select onChange={sortSelectHandler} className="sort-by__select">
    <option> Name of course</option>
    <option>Course supplier</option>
    <option>Descending Course length</option>
    <option>Ascending Course length</option>
    <option>Review date</option>
    <option>Nr of stars</option>


</select>
)
};

export default SortBy;