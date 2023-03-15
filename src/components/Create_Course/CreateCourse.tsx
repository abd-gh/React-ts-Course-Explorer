import React, { useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../login/UserContext";
import "./CreateCourse.css";
import { Course } from "../Courses-List/CourseListModels";

const CreateCourse = () => {
  const userContext = useContext(UserContext);

  //connection
  const coursesCollectionRef = collection(db, "Courses");

  const [courseInput, setCourseInput] = useState<Course>({} as Course);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Name = event.target.value;
    setCourseInput(course);
  };

  const instructorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Instructor = event.target.value;
    setCourseInput(course);
  };

  const lengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Course_length = Number(event.target.value);
    setCourseInput(course);
  };
  const linkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.link = event.target.value;
    setCourseInput(course);
  };
  const SupplierHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.supplier = event.target.value;
    setCourseInput(course);
  };
  const requiredHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Skills_Required = event.target.value;
    setCourseInput(course);
  };
  const learnedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Skills_Learned = event.target.value;
    setCourseInput(course);
  };
  const DescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = { ...courseInput };
    course.Description = event.target.value;
    setCourseInput(course);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addDoc(coursesCollectionRef, {
        Course_length: courseInput.Course_length,
        Created_by: userContext.user?.name,
        Created_time: new Date(),
        Description: courseInput.Description,
        Instructor: courseInput.Instructor,
        Name: courseInput.Name,
        Skills_Learned: courseInput.Skills_Learned,
        Skills_Required: courseInput.Skills_Required,
        link: courseInput.link,
        supplier: courseInput.supplier,
        Points: 0,
        count: 0,
        Rate_Avg: 0,
        Last_Review_date: "",
        Last_Review_Name: "",
      });
      setCourseInput((prevCourseInput) => ({
        ...prevCourseInput,
        Name: "",
        Instructor: "",
        Course_length: 0,
        supplier: "",
        Skills_Learned: "",
        Skills_Required:   "",
        Description: "",
        link: ""

      }));
      alert("Document added successfully!");
    }
   catch(e){
    console.error("Error adding document: ", e);
   }

  };

  const [style, setStyle] = useState("show2");

  const changeStyle = () => {
    style === "show2" ? setStyle("Create-Course") : setStyle("show2")
  };

  return (
    <div >
      <button className="button-addCourse" onClick={changeStyle}>
        +
      </button>
      <form
        id="create-course-form"
        onSubmit={submitHandler}
        className={style}
      >
        <label className="label">Name</label>
        <input
          className="Create-Course__Input"
          onChange={nameHandler}
          type="text"
          placeholder="Name of Course"
          value={courseInput.Name}
        ></input>

        <label className="label">instructor </label>
        <input
          className="Create-Course__Input"
          onChange={instructorHandler}
          type="text"
          placeholder="Instructor"
          value={courseInput.Instructor}
        ></input>

        <label className="label">length</label>
        <input
          className="Create-Course__Input"
          onChange={lengthHandler}
          type="number"
          placeholder="Length in Month"
          value={courseInput.Course_length}
        ></input>

        <label className="label">Link</label>
        <input
          className="Create-Course__Input"
          onChange={linkHandler}
          type="text"
          placeholder="link"
          value={courseInput.link}
        ></input>

        <label className="label">Supplier</label>
        <input
          className="Create-Course__Input"
          onChange={SupplierHandler}
          type="text"
          placeholder="Supplier"
          value={courseInput.supplier}
        ></input>

        <label className="label">Skills required</label>
        <input
          className="Create-Course__Input"
          onChange={requiredHandler}
          type="text"
          placeholder="Skills required"
          value={courseInput.Skills_Required}
        ></input>

        <label className="label-textarea">Skills learned</label>
        <input
          className="Create-Course__Input"
          onChange={learnedHandler}
          type="text"
          placeholder="Skills learned"
          value={courseInput.Skills_Learned}
        />

        <label className="label-textarea">Description</label>
        <input
          className="Create-Course__Input"
          onChange={DescriptionHandler}
          type="text"
          placeholder="Description"
          value={courseInput.Description}
        />

        <div className="buttons">
          <button className="button-action" type="submit">
            Add Course
          </button>
          <button onClick={changeStyle} className="button-action">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
