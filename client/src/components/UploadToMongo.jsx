import React, { useState, useEffect } from "react";
import {} from "react-router";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { initStudent, addParents, addReflection } from "../scripts/postData";

export default function UploadToMongo(){
    //const OrgUnitId = props.OrgUnitId;
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [type, setType] = useState("initClass");
    const [title, setTitle] = useState("");
    const user = window.user;

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const typeChange = (e) => {
      setType(e.target.value);
    }

    const handleTitleOnChange = (e) => {
      setTitle(e.target.value);
    }

    const csvFileToArray = async string => {
        //const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(0).split("\r\n");
        let tempArray = []
        for (var i = 2; i < csvRows.length-1;i+=2){
            //console.log("Topic: ", csvRows[i].split(",").filter(Boolean));
            //console.log("K: ", csvRows[i+1].split(",").filter(Boolean));
            //console.log("A: ", csvRows[i+2].split(",").filter(Boolean));
            tempArray.push({
                title: csvRows[i].split(",").filter(Boolean)[0],
                skills: csvRows[i+1].split("\t").filter(Boolean),
                rating: Array(csvRows[i+1].split("\t").filter(Boolean).length).fill(0)
            });
        }
                
        
        setArray(tempArray);
        //console.log(tempArray);
        await fetch(`/api/updateSkillsTemplate`, {
            method: "POST",
            body: JSON.stringify({OrgUnitId: user.OrgUnitId, skills: tempArray}),
            headers: {
            'Content-Type': 'application/json'
            },
        }).catch(error => {
            window.alert(error);
            return;
          });
      };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        if (file) {
          var reader = new FileReader();
          reader.onload = onReaderLoad;
          reader.readAsText(file);
        }
      };
      async function onReaderLoad(event){
        //console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        //console.log(obj[0].type)
        if(type == "initClass"){
          //console.log(obj);
          obj.map((student,index)=>{
            //console.log(student.name,student.email, window.user.OrgUnitId);//and CourseCode
            if(student.teacherType !== "Teacher"){
              initStudent({"name":student.name,"email":student.email,"courseID":window.user.OrgUnitId, "userThumb": student.userThumb});
            }
          });
        }else if(type == "addParents"){
          console.log(obj);
          obj.Students.map((student,index)=>{
            //console.log(student.PhotoUrl, student.Parents);
            addParents({"userThumb":student.PhotoUrl,"courseID":window.user.OrgUnitId,"parents":student.Parents});
          });
        }else if(type == "reflection"){
          for(var i = 0; i < obj.length; i++){
            let data = {"email" : obj[i].Username, "title": title};
            var temp = obj[i];
            delete temp["Username"];
            delete temp["Timestamp"];
            data["reflection"] = temp;
            addReflection(data);
            console.log(data);
          }
          
        }else{
          console.log("Who Knows???");
        }        
      }

      const headerKeys = Object.keys(Object.assign({}, ...array));

    return(
        <div>
            <h1>Upload JSON to Mongo</h1>
            <div className="settings" style={{ textAlign: "center" }}>
                <form>
                    <input
                        type={"file"}
                        id={"txtFileInput"}
                        accept={".json"}
                        onChange={handleOnChange}
                    />
                    <select id = "type" onChange={typeChange}>
                        <option value="initClass">Initialize Class</option>
                        <option value="addParents">Add Parents</option>
                        <option value="reflection">Add/Update Reflection</option>
                    </select>
                    {type=="reflection"?<input type="text" id="reflectionTitle" onChange={handleTitleOnChange}></input>:""}
                    <button onClick={(e) => {handleOnSubmit(e);}}>
                        Upload
                    </button>
                </form>
                <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
            </div> 
        </div>
    )
}