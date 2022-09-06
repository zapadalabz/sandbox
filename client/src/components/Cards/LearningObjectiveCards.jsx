import React, { useState, useEffect } from "react";
import {} from "react-router";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import '../../styles/inputSlider.css';
import '../../styles/learningObjectiveCard.css'


//With email/classID, get users Skills from DB
//Display Current Reflection of Skills, allow user to edit and update(automatically?)


export default function LearningObjectiveCards(props){
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const skillsTemplate = [{_id:1,title:"Title 1",content:"Sample Learning Objective 1"},{_id:2,title:"Title 2",content:"Sample Learning Objective 2"}];
    const learnerRatings= [{_id:1, rating:1},{_id:2,rating:3}];
    const email = "student@test.com";
    const user = window.user;
    const skills = [];
    //console.log(skills)

    const onSubmit = async data => {
        
        for(var i = 0;i < data.data.length;i++){
            skills[i] = {...skills[i],rating:data.data[i].rating};
        }
        //console.log(sample);

        await fetch(`http://localhost:5000/api/update`, {
            method: "POST",
            body: JSON.stringify({OrgUnitId: user.OrgUnitId, email: email, skills: skills}),
            headers: {
            'Content-Type': 'application/json'
            },
        }).catch(error => {
            window.alert(error);
            return;
          });
    }

    function setNewValues(){
        for(var i = 0; i < skills.length;i++){
            const topic = skills.title;
            for(var j=0;j<skills[i].skills.length;j++){
                //console.log(skills[i].skills[j]);
                setValue("data." + i+".rating."+j,skills[i].rating[j]);
            }
            
        }
    }

    function ObjectiveCard(props){
        const id = props.id;
        const content = props.content;
        const tIndex = 0;
        const [value, setAValue] = useState(0);

        return(
            <div className = "learningObjectiveCard mb-3">
                {content} <input className={`slider ${"slider-" + value}`} {...register("data." + tIndex+".rating."+id)} type="range" min="0" max="3" value={value} step="1" onChange={({ target: { value } }) => setAValue(value)}/>
            </div>
        )
    }
    
    let objectivesList = skillsTemplate.map((skill)=>{
        return <ObjectiveCard key = {skill._id} id = {skill._id} content = {skill.content}/>
    });

    return(
    <form onSubmit={handleSubmit(onSubmit)}>
        {objectivesList}
        {user.role ==="Learner"?<input type="submit" value="Update"/>:""}
    </form>);
}