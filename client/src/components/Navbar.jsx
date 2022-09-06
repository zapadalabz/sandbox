import React from "react";

 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar(props) {
  const student = props.student;
  const studentData = props.studentData;
  const role = window.user.role;

  let studentList = Object.keys(studentData).map((index)=>{
    return <a href="#" key={index} onClick={()=>props.setStudent(index)}>{studentData[index].email}</a>
    //return <TopicCard topic = {skills[index]} key = {index} tIndex = {index}/>
});
 return (
   <div className="d-flex topNav">
     

       <div className = "studentNav">
        <div className="dropdown">
          <button className="dropbtn">{studentData.length>0?studentData[student].email:"Loading..."}</button>
          <div className="dropdown-content">
            {studentList}
          </div>
        </div>
       </div>
       <div className="menuNav">
        <button className="navBtn">Learning Objectives</button>
        <button className="navBtn">Reflections</button>
        {role==="Instructor"?<button className="navBtn">Admin</button>:""}
       </div>
     
   </div>
 );
}