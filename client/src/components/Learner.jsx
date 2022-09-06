import React from "react";
import student from "../img/placeholder.jpg";
import ChallengeCard from "./Cards/ChallengeCard";
import LearningObjectiveCards from "./Cards/LearningObjectiveCards";

export default function Learner(){

    return(
        <div className = "d-flex flex-column mx-auto">
            <ChallengeCard/>
            <LearningObjectiveCards/>
        </div>
    );
}