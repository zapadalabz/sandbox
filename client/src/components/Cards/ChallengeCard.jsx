import React, { useEffect, useState } from "react";
import '../../styles/challengeCard.css'

export default function ChallengeCard(){
    var percentEasy = 1;
    var percentMedium = 25;
    var percentHard = 1;

    function ChallengeProgressBar(){
        return(
            <div className="d-flex flex-row">
                <strong>Challenge Progress: </strong>
                <div className="challengeBar d-flex flex-row">
                    <div className="challengeBar-Easy" style={{width:percentEasy+"%"}}></div>
                    <div className="challengeBar-Medium" style={{width:percentMedium+"%"}}></div>
                    <div className="challengeBar-Hard" style={{width:percentHard+"%"}}></div>
                </div>
            </div>
            
        )
    }

    return(
        <div className="challengeCard">
            <ChallengeProgressBar/>
        </div>        
    );
}