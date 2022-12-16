
import React, { useContext, useEffect, useState } from "react";
import { async } from '@firebase/util';
import { db } from "../../firebase-config";
import { addDoc, collection, doc, getDocs, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { query, where, limit } from "firebase/firestore";
import './List.css';
import Rate from "./rate";
import { SearchContext } from "../Filter/FilterBar";


const List = () => {
    const searchInput=useContext(SearchContext) 
  /*  type Course={
    id:string,
    Course_length:string
    Created_by:string
    Description:string
    Instructor:string
    Last_Review_Name:string
    Last_Review_date:string
    Name:string
    Points:number
    Rate_Avg:number
    Skills_Learned:string
    Skills_Required:string
    count:number
    supplier:string
    link:string
    }[]*/

    //tabel in DB
    const [ourCourses, setOurCourses] = useState<any[]>([]);
    //connection
    const coursesCollectionRef = collection(db, "Courses");

    //Update Rate
    const[rateChange,setRateChange]=useState<number>(0);
    const updateRate=(count:number):void=>{
        setRateChange(current=>current+count)
        console.log(rateChange)
    }

    useEffect(() => {
        const getCourses = async () => {
            const data = await getDocs(coursesCollectionRef)
            setOurCourses(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
           // console.log(ourCourses)
        };
        getCourses()
    }, [rateChange,searchInput.searchWord?.value,searchInput.sortType?.value]);

    let SortedCourse = [...ourCourses].sort((a, b) => a.Name > b.Name ? 1 : -1,);
    if (searchInput.sortType?.value == "Course supplier") {
        SortedCourse = [...ourCourses].sort((a, b) => a.supplier > b.supplier ? 1 : -1,);
    }
    else if (searchInput.sortType?.value == "Descending Course length") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Course_length > b.Course_length ? -1 : 1,);
    }
    else if (searchInput.sortType?.value == "Ascending Course length") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Course_length > b.Course_length ? 1 : -1,);
    }
    else if (searchInput.sortType?.value == "Name of course") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Name > b.Name ? 1 : -1,);
    }
    else if (searchInput.sortType?.value == "Review date") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Last_Review_date > b.Last_Review_date ? -1 : 1,);
    }
    else if (searchInput.sortType?.value == "Nr of stars") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Rate_Avg > b.Rate_Avg ? -1 : 1,);
    }
   
    const SearchCourse = SortedCourse.filter(x => {
        return x.Name.toLowerCase().match(new RegExp(searchInput.searchWord?.value ? searchInput.searchWord?.value : '', 'g')) ||
            x.Skills_Learned.toLowerCase().match(new RegExp(searchInput.searchWord?.value ? searchInput.searchWord?.value : '', 'g')) ||
            x.Description.toLowerCase().match(new RegExp(searchInput.searchWord?.value ? searchInput.searchWord?.value : '', 'g')) ||
            x.supplier.toLowerCase().match(new RegExp(searchInput.searchWord?.value ? searchInput.searchWord?.value : '', 'g')) ||
            x.Instructor.toLowerCase().match(new RegExp(searchInput.searchWord?.value ? searchInput.searchWord?.value : '', 'g'));
    });

    return (
        <>        
            {SearchCourse.map((course) => {
                return (
                    <>
                    
                        <div className="bottom">
                            <h2>{course.Name}</h2>
                            <div className="course-body">
                                <div className="course-information">
                                    <p className="course-sourse">{course.Instructor}, {course.supplier}</p>
                                    <p className="course-description">{course.Description}</p>
                                    <p>Length: {course.Course_length}   Month </p>
                                    <p className="course-skills">Skills: {course.Skills_Learned}   </p>
                                </div>  
                                <Rate {...course} updateRate={updateRate}/>                 
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default List; 