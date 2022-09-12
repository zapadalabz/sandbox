import React, {useEffect, useState} from "react";
import "../styles/studentPage.css"
import { getStudent } from "../scripts/getData";
import StudentCard from "./Cards/StudentCard";

export default function StudentPage(){
    const [students, setStudents] = useState([]);
    useEffect(() => {
        getStudent(window.user.OrgUnitId).then((resp)=>{
          if(resp == null){
            console.log("Go to course Init");
          }else{
            console.log(resp);
            setStudents(resp);
          }
          
        });
    }, []);
    return(
        <div className="student-main">
            {students.length >0?<StudentCard students = {students}/>:""}
        </div>
    )
}