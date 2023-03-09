import React, { useContext, useState } from "react";
import { db } from "../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./rate.css";
import { UserContext } from "../login/UserContext";
import { Course } from "./CourseListModels";


const Rate = ({
  id,
  Name,
  Rate_Avg,
  Last_Review_Name,
  Last_Review_date,
  Points,
  count,
  updateRate,
}: Course) => {
  const userContext = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const CourseEvaluationCollectionRef = collection(db, "Course_Evaluation");
  const [rateChange, setRateChange] = useState(0);

  const addRating = async (
    index: number,
    id: string,
    points: number,
    count: number
  ): Promise<void> => {
    console.log("hello");
    await addDoc(CourseEvaluationCollectionRef, {
      Course_Id: id,
      Username: userContext.user?.name,
      date: new Date(),
      rate: index,
    });
    setRating(index);
    update(id, index, points, count);
  };

  const update = async (
    id: string,
    rate: number,
    points: number,
    count: number
  ): Promise<void> => {
    const courseDoc = doc(db, "Courses", id);
    const newFields = {
      Points: points + rate,
      count: count + 1,
      Rate_Avg: (points + rate) / (count + 1),
      Last_Review_date: new Date(),
      Last_Review_Name: userContext.user?.name,
    };
    await updateDoc(courseDoc, newFields);
    //setRateChange(oldKey => oldKey + 1);
    updateRate(1);
    // done(rateChange);
  };

  return (
    <div className="course-evaluate ">
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= (hover || Math.round(Rate_Avg)) ? "on" : "off"
              }
              onClick={() => {
                if (
                  window.confirm(
                    "Do you really want to evaluate a " +
                      Name +
                      " course with " +
                      index +
                      " stars?"
                  )
                ) {
                  addRating(index, id, Points, count);
                }
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(Math.round(Rate_Avg))}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <div className="last-review">
        <p>last review</p>
        <p>{Last_Review_Name}</p>
        <p>{Last_Review_date && Last_Review_date.toDate().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Rate;
