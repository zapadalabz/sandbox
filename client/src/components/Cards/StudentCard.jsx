//https://branksome.myschoolapp.com/ftpimages/757/user/
import React, { useEffect, useState, useRef } from "react";
import '../../styles/studentCard.css'
import {IoIosArrowDropup,IoIosArrowDropdown} from 'react-icons/io';

export default function StudentCard(props){
    const [currentReflection, setCurrentReflection] = useState(0);
    var students = props.students;
    
    
    function RCard(props){
        var reflectionTitle = props.reflections[currentReflection][0];
        var reflections = Object.entries(props.reflections[currentReflection][1]);
        //console.log(reflections);
        let reflectionList = reflections.map((reflection,index)=>{
            return(
                <div className="refCont">
                    <div className="refQ">
                        <strong>{reflection[0]}</strong>
                    </div>
                    <div className="refResponse">
                        {reflection[1]}
                    </div>
                </div>
            )
        });
        return(
            <div>
                <h2>{reflectionTitle}</h2>
                {reflectionList}
            </div>
        )
    }
    

    function Card(props){
        const student = props.student;
        let reflectionContent = useRef();
        const [reflectionToggle, setReflectionToggle] = useState(false);

        if(student.reflections){
            var reflections = Object.entries(student.reflection);
        }else{
            var reflections = [];
        }

        const toggleReflection = () => {
            if(reflectionToggle){
                console.log(1);
                reflectionContent.current.style.display = " none";
            }else{
                console.log(2);
                reflectionContent.current.style.display = "flex";
            }
            setReflectionToggle(!reflectionToggle);
        }
        //console.log(student.parents);
        let parentList = student.parents.map((parent,index)=>{
            return(
            <div key = {index} className="parentInfo">
                {parent.Name}
                {" "}
                {parent.Email}
            </div>)
        })
        //console.log(Object.entries(student.reflection));
        return(
            <div className="cardContainer">
                <div className="d-flex">
                    <div className="namePlaque">
                        <img src={"https://branksome.myschoolapp.com/ftpimages/757/user/"+student.userThumb.replace("thumb","large")} className="studentImg"/>
                        {student.name}   
                    </div>     
                    <div className="studentData">
                        {parentList}
                    </div>           
                </div>
                <div className="toggleContainer" onClick={toggleReflection}>
                    <span className="reflectionToggleBtn">{reflectionToggle?<IoIosArrowDropup size={30}/>:<IoIosArrowDropdown size={30}/>}</span>
                </div>
                
                <div className="reflectionContainer" ref={reflectionContent}>
                    {reflections.length>0?<RCard key={student.name} reflections={reflections}/>:""}
                </div>
            </div>            
        )
    }

    let studentList = students.map((student,index)=>{
        return <Card student = {student} key = {index}/>
    })
    return(
        <div className='studentCard'>
            {studentList}
        </div>
    )
}