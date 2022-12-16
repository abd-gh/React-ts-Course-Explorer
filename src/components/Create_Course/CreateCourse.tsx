import React, { useState } from "react";
import { async } from '@firebase/util';
import { db } from "../../firebase-config";
//import db from "../../firebase-config";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../login/UserContext";
import './CreateCourse.css';

const CreateCourse = () => {

    const userContext = useContext(UserContext);

    //addnig to list
   // const[addToList,setAddToList]=useState(0);

    //connection
    const coursesCollectionRef = collection(db, "Courses");

    type Course={
        name: string ,
        instructor: string,
        description: string,
        link: string,
        supplier: string,
        required: string,
        learned: string,
        Created_by: string,
        Created_time: string,
        Course_length: string,
    }
    const [courseInput, setCourseInput] = useState<Course>({} as Course)

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, name: event.target.value }
        });
    };
    const instructorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, instructor: event.target.value }
        });
    };
    const lengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, Course_length: event.target.value }
        });
    };
    const linkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, link: event.target.value }
        });
    };
    const SupplierHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, supplier: event.target.value }
        });
    };
    const requiredHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, required: event.target.value }
        });
    };
    const learnedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, learned: event.target.value }
        });
    };
    const DescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseInput((prevState) => {
            return { ...prevState, description: event.target.value }
        });
    };

    const submitHandler = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(courseInput.Course_length+" "+userContext.user?.name+" "+courseInput.description+" "+courseInput.instructor+" "+
        courseInput.name+" "+ courseInput.learned+" "+courseInput.required+" "+courseInput.link+" "+courseInput.supplier)

        await addDoc(coursesCollectionRef, {
            Course_length: courseInput.Course_length,
            Created_by: userContext.user?.name,
            Created_time: new Date(),
            Description: courseInput.description,
            Instructor: courseInput.instructor,
            Name: courseInput.name,
            Skills_Learned: courseInput.learned,
            Skills_Required: courseInput.required,
            link: courseInput.link,
            supplier: courseInput.supplier,
            
            Points:0,
            count:0,
            Rate_Avg:0,
            Last_Review_date:'',
            Last_Review_Name:''
        });
        //setAddToList(oldKey => oldKey +1);
       // props.onAddCourse(addToList);
       // event.target.res;
        
    };
 
    const [showForm, setShowForm] = useState(false);

    const showFormHandler = () => {
        setShowForm(!showForm);
    };
    return (
        <div>
            {showForm ?
            (
        <form id="create-course-form" onSubmit={submitHandler} className="Create-Course" >

            <label className="label">Name</label>
            <input className="Create-Course__Input" onChange={nameHandler}  type="text"  placeholder="Name of Course"></input>

            <label className="label">instructor </label>
            <input className="Create-Course__Input" onChange={instructorHandler}  type="text" placeholder="Instructor"></input>

            <label className="label">length</label>
            <input className="Create-Course__Input" onChange={lengthHandler}  type="number" placeholder="Length in Month"></input>

            <label className="label">Link</label>
            <input className="Create-Course__Input" onChange={linkHandler} type="text" placeholder="link"></input>

            <label className="label">Supplier</label>
            <input className="Create-Course__Input" onChange={SupplierHandler} type="text" placeholder="Supplier"></input>

            <label className="label">Skills required</label>
            <input className="Create-Course__Input" onChange={requiredHandler} type="text" placeholder="Skills required"></input>

            <label className="label-textarea">Skills learned</label>
            <input className="Create-Course__Input" onChange={learnedHandler} type="text" placeholder="Skills learned" />

            <label className="label-textarea">Description</label>
            <input  className="Create-Course__Input" onChange={DescriptionHandler}  type="text" placeholder="Description" />

            <div className="buttons">
                <button  className="button-action" type="submit">Add Course</button>
                <button onClick={showFormHandler} className="button-action" >Cancel</button>
            </div>
        </form>
        ) :(
            <button className="button-addCourse" onClick={showFormHandler}>+</button>
        )
    }
    </div>
    )
}

export default CreateCourse;