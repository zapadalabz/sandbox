import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/questionViewer.css"
import Parser from 'html-react-parser';
import { CKEditor } from 'ckeditor4-react';

export default function QuestionViewer(props){
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const qViewRef = props.passRef;
    const qBank = props.qBank;
    const [qNum, setQNum] = useState(0);
    const [answer, setAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const onSubmit = async formData =>{
        var choice = parseInt(formData.MCQ);
        for(var i = 0; i < qBank[qNum].MCQ_set.length; i++){
            console.log(i);
            if(qBank[qNum].MCQ_set[i].is_correct){
                setCorrectAnswer(i);
                break;
            }
        }
        console.log(qBank[qNum].id);
        setAnswer(choice);
    }

    const nextButtonHandler = () =>{
        if(qNum < qBank.length){
            setAnswer("");
            setCorrectAnswer("");
            setQNum(qNum+1);
        }
    }


    const closeViewer = () =>{
        qViewRef.current.style.display = "none";
    }

    function Choices(){
        const A = Math.floor(Math.random() * 4);
        const B = (A+1)%4;
        const C = (A+2)%4;
        const D = (A+3)%4;
        //correct ansswer is probably the MCQ_set[0], but just incase
        //check qBank[qNum].MCQ_set[x].is_correct

        return(
            <div className="mcq_choices">
                <div className="mcq_answer">
                    <input type="radio" name="MCQ" {...register("MCQ")} id="A" value={A}/>
                    <label htmlFor="A">{qBank.length>0?Parser(qBank[qNum].MCQ_set[A].answer_html):""}</label>
                </div>
                <div className="mcq_answer">
                    <input type="radio" name="MCQ" {...register("MCQ")} id="B" value={B}/>
                    <label htmlFor="B">{qBank.length>0?Parser(qBank[qNum].MCQ_set[B].answer_html):""}</label>
                </div>
                <div className="mcq_answer">
                    <input type="radio" name="MCQ" {...register("MCQ")} id="C" value={C}/>
                    <label htmlFor="C">{qBank.length>0?Parser(qBank[qNum].MCQ_set[C].answer_html):""}</label>
                </div>
                <div className="mcq_answer">
                    <input type="radio" name="MCQ" {...register("MCQ")} id="D" value={D}/>
                    <label htmlFor="D">{qBank.length>0?Parser(qBank[qNum].MCQ_set[D].answer_html):""}</label>
                </div>
            </div>
        )
    }

    function Answers(){
        return(
            <div className="answers">
                <strong>Explanation:</strong>
                <p></p>
                <CKEditor initData="<p>Hello <strong>world</strong>!</p>" />
                {qBank.length>0?Parser(qBank[qNum].MCQ_set[correctAnswer].answer_explanation_html):""}
            </div>
        )
    }
    function Answered(){
        return(
            <>
                <div className={qBank[qNum].MCQ_set[answer].is_correct?"correct":"incorrect"}>
                    Your Answer: {Parser(qBank[qNum].MCQ_set[answer].answer_html)}
                </div>
                <div className="d-flex gap-3">
                    {qBank[qNum].MCQ_set[answer].is_correct?"":"Correct Answer: "}
                    {qBank[qNum].MCQ_set[answer].is_correct?"":Parser(qBank[qNum].MCQ_set[correctAnswer].answer_html)}
                </div>
                
                <Answers/>
            </>
            
        )
    }

    return(
        <div className="questionViewer" ref = {qViewRef}>
            <div className="qBox">
                <button className="closeButton" onClick={closeViewer}>X</button>
                {qBank.length>0?Parser(qBank[qNum].question_html):""}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {answer==""?<Choices/>:<Answered/>}
                    {answer==""?<input className = "submitButton" type="submit" value="Submit"/>:<button className="submitbutton" onClick={nextButtonHandler}>Next</button>}
                </form>
            </div>
        </div>
    )
}