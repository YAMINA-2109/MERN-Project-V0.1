import {useState} from 'react';
import {useEffect} from 'react';
import './Question.css';
// import { questions } from './data';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

import AOS from 'aos';
import 'aos/dist/aos.css';


const Question = ({title, answer}) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        })
    },[])

    const [showAnswer, setShowAnswer] = useState(false);
    const handleClick = ()=>{
        setShowAnswer(!showAnswer);
    }
  return (
        <div className="container question" data-aos="fade-up">
            <div className="question-title">
                <h4>{title}</h4>
                <button className='question-icon' onClick={handleClick}>
                    {showAnswer ? <AiOutlineMinus color='red'/> : <AiOutlinePlus color='#1f93ff'/>}
                </button>
            </div>
            <div className="question-answer">
                {showAnswer && <p className='u-text-small'>{answer}</p>}
            </div>
        </div>
  )
}

export default Question
