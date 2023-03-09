import React, { useContext } from "react";
import { SearchContext } from "./FilterBar";
import { FilterInput, SortOptionsEnum } from "./FilterModels";
import "./SortBy.css";

const SortBy = () => {
  const sortSelected = useContext(SearchContext);

  const sortSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value || null;
    sortSelected.setSortType(val);
  };

  return (
    <select onChange={sortSelectHandler} className="sort-by__select">
      <option value={SortOptionsEnum.COURSE_NAME}>Name of course</option>
      <option value={SortOptionsEnum.COURSE_SUPPLIER}>Course supplier</option>
      <option value={SortOptionsEnum.LENGTH_DESC}>
        Descending Course length
      </option>
      <option value={SortOptionsEnum.LENGTH_ASC}>
        Ascending Course length
      </option>
      <option value={SortOptionsEnum.REVIEW_DATE}>Review date</option>
      <option value={SortOptionsEnum.NR_OF_STARS}>Nr of stars</option>
    </select>
  );
};

export default SortBy;
