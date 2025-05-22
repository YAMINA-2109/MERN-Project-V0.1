// import React from 'react';
import {useEffect} from 'react';
import {MdOutlineLibraryBooks} from 'react-icons/md';
import Question from './Question';
import { questions } from './data';
import './Faq.css';

import AOS from 'aos';
import 'aos/dist/aos.css';


const Faq = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        })
    },[])

    return (
        <section id='faq'>
            <div className="container faq">
                <div className="u-title" data-aos="fade-down">
                    <MdOutlineLibraryBooks color='orangered' size={30}/>
                    <h2>A Propos de nous</h2>
                    <p className="u-text-small">
                    Découvrez qui nous sommes et comment nous contribuons à la gestion et à la valorisation du patrimoine foncier de la région.
                    </p>
                </div>
                <div className="questions">
                    {questions.map((question)=>(
                        <Question key={question.id} title={question.title} answer={question.answer}/>
                    ))}
                </div>
                    {/* <Question/> */}
            </div>
        </section>
  )
}

export default Faq
