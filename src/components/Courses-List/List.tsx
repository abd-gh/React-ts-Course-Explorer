import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./List.css";
import Rate from "./rate";
import { SearchContext } from "../Filter/FilterBar";
import { Course } from "./CourseListModels";
import { SortOptionsEnum } from "../Filter/FilterModels";

const List = () => {
  const searchInput = useContext(SearchContext);

  //tabel in DB
  const [ourCourses, setOurCourses] = useState<Course[]>([]);
  //connection
  const coursesCollectionRef = collection(db, "Courses");

  // When this value changes, the course list should refresh
  const [listRefresh, setlistRefresh] = useState<number>(0);

  //Update Rate
  const updateRate = (count: number): void => {
    setlistRefresh((current) => current + count);
  };

  //A new course has been added
  const refreshList=(count:number):void=>{
    setlistRefresh((current)=>current+count);
  }

  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef);
      const courses = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setOurCourses(courses as Course[]);
    };
    getCourses();
  }, [listRefresh, searchInput.searchWord, searchInput.sortType]);

  let SortedCourse = [...ourCourses].sort((a, b) => (a.Name > b.Name ? 1 : -1));
  if (searchInput.sortType === SortOptionsEnum.COURSE_SUPPLIER.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) =>
      a.supplier > b.supplier ? 1 : -1
    );
  } else if (searchInput.sortType === SortOptionsEnum.LENGTH_DESC.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) =>
      a.Course_length > b.Course_length ? -1 : 1
    );
  } else if (searchInput.sortType === SortOptionsEnum.LENGTH_ASC.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) =>
      a.Course_length > b.Course_length ? 1 : -1
    );
  } else if (searchInput.sortType === SortOptionsEnum.COURSE_NAME.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) => (a.Name > b.Name ? 1 : -1));
  } else if (searchInput.sortType === SortOptionsEnum.REVIEW_DATE.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) =>
      a.Last_Review_date > b.Last_Review_date ? -1 : 1
    );
  } else if (searchInput.sortType === SortOptionsEnum.NR_OF_STARS.toString()) {
    SortedCourse = [...ourCourses].sort((a, b) =>
      a.Rate_Avg > b.Rate_Avg ? -1 : 1
    );
  }

  const SearchCourse = SortedCourse.filter((x) => {
    return (
      x.Name.toLowerCase().match(
        new RegExp(searchInput.searchWord ? searchInput.searchWord : "", "g")
      ) ||
      x.Skills_Learned.toLowerCase().match(
        new RegExp(searchInput.searchWord ? searchInput.searchWord : "", "g")
      ) ||
      x.Description.toLowerCase().match(
        new RegExp(searchInput.searchWord ? searchInput.searchWord : "", "g")
      ) ||
      x.supplier
        .toLowerCase()
        .match(
          new RegExp(searchInput.searchWord ? searchInput.searchWord : "", "g")
        ) ||
      x.Instructor.toLowerCase().match(
        new RegExp(searchInput.searchWord ? searchInput.searchWord : "", "g")
      )
    );
  });

  return (
    <>
      {SearchCourse.map((course) => {
        return (
          <div className="bottom">
            <h2>{course.Name}</h2>
            <div className="course-body">
              <div className="course-information">
                <p className="course-sourse">
                  {course.Instructor}, {course.supplier}
                </p>
                <p className="course-description">{course.Description}</p>
                <p>Length: {course.Course_length} Month </p>
                <p className="course-skills">
                  Skills: {course.Skills_Learned}{" "}
                </p>
              </div>
              <Rate {...course} updateRate={updateRate} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
