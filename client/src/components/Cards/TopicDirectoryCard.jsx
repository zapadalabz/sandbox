import React, {useEffect, useState, useRef} from "react";
import '../../styles/topicDirectoryCard.css';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';


export default function TopicDirectoryCard(props){
    const allTopics = props.topics;
    const currentTopics = props.currentTopics;//same length as allTopics [[1,1.1,1.2],[2,2.1,2.2,"false"],etc] "false" indicates topic not selected by instructor
    let register = props.register;
    const setValue = props.setValue;

    useEffect(()=>{
        for(var i = 0;i<currentTopics.length;i++){
            for(var j = 0; j < currentTopics[i].length; j++){
                setValue("topics." + i + "." + j,currentTopics[i][j]);
            }
        }
    },[]);

    function SubTopicCard(props){
        const topicNumber = props.topicNumber;
        const subtopicNumber = props.subtopicNumber;
        const subtopic = props.subtopic;
        const topicRefs = props.topicRefs;
        const index = topicNumber -1;
        const {ref, ...rest} = register("topics." + index + "." + subtopicNumber);

        const handleSubTopicChange = event =>{
            var flag = false;
            for(var i = 1; i < topicRefs.current.length;i++){
                if(topicRefs.current[i].current.checked === true){
                    //topicRefs.current[0].current.checked = true;
                    setValue("topics." + index + "." + 0,topicRefs.current[0].current.value);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                //topicRefs.current[0].current.checked = false;
                setValue("topics." + index + "." + 0,false);
            }
        }

        return(
            <div className="subtopicCard">
                <input {...rest} type="checkbox" id = {"subOption"+topicNumber+"."+subtopicNumber} value = {subtopic} onChange={handleSubTopicChange} ref={(e)=>{
                    ref(e);
                    topicRefs.current[subtopicNumber].current = e;
                }}/>
                <label htmlFor={"subOption"+topicNumber+"."+subtopicNumber}>{topicNumber + "." + subtopicNumber + " " + subtopic}</label>
            </div>
        )
    }

    function TopicCard(props){
        const topicNumber = props.topicNumber + 1;
        const subtopics = props.subtopics;
        let topicRefs = useRef([...new Array(subtopics.length)].map(() => React.createRef()));
        const {ref, ...rest} = register("topics." + props.topicNumber + "." + "0");
        const [visible, setVisible] = useState("none");

        const handleTopicChange = event =>{//Toggle all subOptions when parent is toggled

            for(var i = 0; i < topicRefs.current.length;i++){
                if(event.target.checked){
                    setValue("topics." + props.topicNumber + "." + i,topicRefs.current[i].current.value);
                }else{
                    setValue("topics." + props.topicNumber + "." + i,false);
                }
                
            }
        }

        let subtopicList = subtopics.map((subtopic,index)=>{
            return (index==0?"":<SubTopicCard key = {topicNumber+"."+index} topicNumber = {topicNumber} subtopic = {subtopic} subtopicNumber = {index} topicRefs = {topicRefs}/>);
        })

        const handleTopicClick = event =>{
            if(visible == "none"){
                setVisible("block");
            }else{
                setVisible("none");
            }
        }

        return(
            <div className="topicCard">
                <input {...rest} type="checkbox" id = {"option"+topicNumber} value = {subtopics[0]}  onChange={handleTopicChange} ref={(e)=>{
                    ref(e);
                    topicRefs.current[0].current = e;
                }}/>
                <label htmlFor={"option"+topicNumber}>{topicNumber + " " + subtopics[0]}</label>
                {visible=="none"?<IoIosArrowDropdown className ="dropBtn" size={24} onClick={handleTopicClick}/>:<IoIosArrowDropup className ="dropBtn" size={24} onClick={handleTopicClick}/>}
                <div style={{display:visible}}>
                    {subtopicList}
                </div>
            </div>
        )
    }

    let topicList = allTopics.map((subtopics,index)=>{
        return <TopicCard key = {"T"+index} topicNumber = {index} subtopics = {subtopics} />
    });

    return(
        <div className="directoryCard">
            Topics Available:
            {topicList}
        </div>
    )
}