import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getTopicDirectory } from "../../scripts/getData";
import { postCourse } from "../../scripts/postData";

import TopicDirectoryCard from "../Cards/TopicDirectoryCard";

export default function Settings(){
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const [topics, setTopics] = useState(window.course.topics);//same length as allTopics [[1,1.1,1.2],[2,2.1,2.2,"false"],etc] "false" indicates topic not selected by instructor
    const [allTopics, setAllTopics] = useState([]);
    const [courseType, setCourseType] = useState("");

    const courseList = ["Chemistry"];

    useEffect(() => {
        if(window.course.type === ""){
            setCourseType(courseList[0]);
        }else{
            setCourseType(window.course.type);
        }
      }, []);
    
    useEffect(()=> {
        //console.log(courseType);
        getTopicDirectory(courseType).then((resp)=>{
            if(resp == null){
                console.log("Topics not yet populated.");
            }else{
                setAllTopics(resp.topicList);
            }
        });
    },[courseType]);

    const onSubmit = async formData =>{
        formData.members = window.course.members;
        postCourse(formData);
    }

    const typeChange = event =>{
        setCourseType(event.target.value);
        //Get list of Possible Topics
    }

    return(
    <div className="settings">
        <h1>Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="type">Course Type: </label>
            <select id = "type" {...register("type")} onChange={typeChange}>
                <option value="Chemistry">Chemistry</option>
            </select>
            {allTopics.length == 0?"":<TopicDirectoryCard topics = {allTopics} currentTopics = {window.course.topics} register={register} setValue = {setValue} getValues = {getValues}/>}
            <p>
                <input className = "courseSaveBtn" type="submit" value="Save"/>
            </p>
        </form>
    </div>)
}