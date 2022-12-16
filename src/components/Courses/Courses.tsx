import React from "react";
import List from "../Courses-List/List";
import CreateCourse from "../Create_Course/CreateCourse";
import FilterBar from "../Filter/FilterBar";
import './Courses.css'

export const Courses = () => {
   return (
      <>
         <CreateCourse />
         <FilterBar > 
            <List />
         </FilterBar>
      </>

   )
}