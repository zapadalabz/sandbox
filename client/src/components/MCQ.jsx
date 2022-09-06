import React from "react";
import parse from 'html-react-parser'

import qb from "../KognityQBank/Chemistry/qb.json"

export default function MCQ(){

    console.log(qb[0]);
    return(
        <div className="dataContainer">
            {parse(qb[0].question_html)}
            {parse(qb[0].MCQ_set[0].answer_html)}
            {parse(qb[0].MCQ_set[0].answer_explanation_html)}
        </div>
    )
}