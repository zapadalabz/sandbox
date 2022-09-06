import React, { useEffect, useState } from "react";
import {getSkillsTemplate, getUserSkills} from "../scripts/getData";
import SkillsList from "./SkillsList";
import TopicBar from "./TopicBar";

export default function Data(){
    const [skills, setSkills] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(0);
    useEffect(() => {
        getSkillsTemplate(window.user.OrgUnitId).then(async (template)=>{
            getUserSkills(window.user.OrgUnitId,window.user.email).then(async (skills)=>{
                var output = template;
                if (skills !== null){
                    for(var i =0;i<skills.length;i++){
                        var rating = template[i].rating;
                        for(var j = 0;j<skills[i].rating.length;j++){
                            rating[j] = skills[i].rating[j];
                        }
                        output[i].rating = rating;                    
                    }
                }
                setSkills(output);
            });
        });
    }, []);



    return(
        <div>
            <div>
                <TopicBar skills={skills}/>
            </div>
            <div className = "dataContainer">
                {skills.length>0?<SkillsList skills = {skills[selectedTopic]} email = "a@b.com"/>:""}
            </div>
        </div>
        
    );
}