import React, { useState } from "react";

export default function TopicBar(props){
    const skills = props.skills;
    const [selectedTopic, setSelectedTopic] = useState(0);//This be inherited from above

    function handleTopicSelect(tIndex){
        setSelectedTopic(tIndex);
    }

    function TopicLink(props){
        //console.log(props.topic);
        const topic = props.topic.title;
        const tIndex = props.tIndex;
        //console.log(tIndex,topic);

        return(
            <a className={`topicItem ${selectedTopic==tIndex?"selectedTopic":""}`} href="#" onClick={()=>handleTopicSelect(tIndex)}>{topic}</a>
        )
    }

    let topicLinks = Object.keys(skills).map((index)=>{
        return <TopicLink topic = {skills[index]} key = {index} tIndex = {index}/>
    });

    return(
        <div className="d-flex flex-row gap-2 topicBar">
            {topicLinks}
        </div>
    )
}