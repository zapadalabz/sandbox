import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import TopicDirectoryCard from "../Cards/TopicDirectoryCard";
import QuestionViewer from "../Modal/QuestionViewer";

import { getTopicDirectory, getQuestions, getQuizSectionData } from "../../scripts/getData";

export default function CustomQuiz(){
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const [topics, setTopics] = useState(window.course.topics);//same length as allTopics [[1,1.1,1.2],[2,2.1,2.2,"false"],etc] "false" indicates topic not selected by instructor
    const [allTopics, setAllTopics] = useState([]);
    const [courseType, setCourseType] = useState(window.course.type);
    const [qBank, setQBank] = useState([]);
    const qViewRef = useRef();
    
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


    function sortTopics(topics){
        var sortedTopics = [];
        var sortedSections = [];
        for(var i = 0; i < topics.length; i++){
            if(topics[i][0] != false){
                sortedTopics.push(i+1);
                for(var j = 1; j < topics[i].length; j++){
                    let topicNum = i+1;
                    if(i == 21) topicNum = "A";
                    if(i == 22) topicNum = "B";
                    if(i == 23) topicNum = "C";
                    if(i == 24) topicNum = "D";
                    sortedSections.push(topicNum +"."+j)
                }
            }
        }
        return [sortedSections, sortedTopics];
    }

    const onSubmit = async formData =>{
        let [selectedSections, selectedTopics] = sortTopics(formData.topics);
        let data = {
            sections: selectedSections,
            numQ: formData.numQ
        };
        getQuestions(data).then((resp)=>{
            setQBank(resp);
            qViewRef.current.style.display = "block";
        });
        getQuizSectionData(selectedTopics).then((resp)=>{
            console.log(resp);
        });
    }


    return(
    <div className="customQuiz">
        <h1>Custom Quiz Generator: {window.course.type}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="numQ">Number of Questions: </label>
            <select id = "numQ" {...register("numQ")}>
                <option value="10">10</option>
                <option value="10">15</option>
                <option value="10">20</option>
            </select>
            {allTopics.length == 0?"":<TopicDirectoryCard topics = {allTopics} currentTopics = {[]} register={register} setValue = {setValue} getValues = {getValues}/>}
            <p>
                <input className = "courseSaveBtn" type="submit" value="Begin"/>
            </p>
        </form>
        <QuestionViewer qBank = {qBank} passRef = {qViewRef}/>
    </div>)
}