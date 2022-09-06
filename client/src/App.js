import React, { useState, useEffect, Component } from "react";
import logo from './logo.svg';
import './App.css';

import { Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import Learner from "./components/Learner";
import MCQ from "./components/MCQ";
import Admin from "./components/UploadToMongo"
import Settings from "./components/Instructor/Settings"
import SideNav from "./components/SideNav"
import CustomQuiz from "./components/Learner/CustomQuiz";
//Scripts
import { getCourse, getUser } from "./scripts/getData";
import { newUser, newStudentQuizStats } from "./scripts/postData"


window.user = {fName:"", lName: "", role: "", email: "", OrgUnitId:""};//populated from BS params
window.course = {type:"",topics:[],members:[]};//Populated from current course details

function App() {
  const [student, setStudent] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({fName:"", lName: "", role: "", email: "", OrgUnitId:""});
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  var count = 0;

  useEffect(() => {
    window.user = {
      fName: searchParams.get("firstName"),
      lName: searchParams.get("lastName"),
      role: searchParams.get("role"),
      email: searchParams.get("email"),
      OrgUnitId: searchParams.get("OrgUnitId"),
      UserId: searchParams.get("id")
    };
    console.log(window.user);
    setUser(window.user);
    
    if(window.user.role === "Instructor"){
      //getStudentData(window.user.OrgUnitId).then((resp)=>{
      //  setStudentData(resp);
      //});
    }
    getCourse(window.user.OrgUnitId).then((resp)=>{
      if(resp == null){
        console.log("Go to course Init");
      }else{
        window.course.type = resp.type;
        window.course.topics = resp.topics;
        window.course.members = resp.members;
      }
      
    });
    if(count == 0){
      count++;
      getUser(window.user.UserId).then((resp)=>{
        console.log(count,resp);
        if(resp==null){
          newUser(window.user, window.course);
          //newStudentQuizStats(window.user.UserId,window.course.type);
        }
        setLoading(false);
      });
    }
  }, []);
  
  return (
    <div>
      <SideNav/>
      
      <div className = "mainContainer d-flex flex-row">
        <Routes>
          <Route exact path="/" element={loading?"Loading":<CustomQuiz/>} />
          <Route exact path="/Settings" element={loading?"Loading":<Settings/>} />
        </Routes>
      </div>
  </div>
  );
}

export default App;