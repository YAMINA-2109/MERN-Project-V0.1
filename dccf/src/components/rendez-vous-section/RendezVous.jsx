// import React from 'react'
import {useEffect} from 'react';
import {BsFillBookmarkStarFill, BsFillFileEarmarkTextFill} from 'react-icons/bs';
import { rdv, rendevous, rdv2} from '../../assets/index'
import {BsHexagon} from 'react-icons/bs';
// import Feature from '../features/Feature';
import Onerendezvous from './Onerendezvous';
import featureListLeft from './dataLeft';
import {AiFillCarryOut, AiOutlineCalendar, AiOutlineCarryOut} from 'react-icons/ai';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './RendezVous.css';

const RendezVous = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  },[])
  return (
    <section id='features' className='rdv'>
      <div className="container features">
        <div className="u-title">
            <AiOutlineCarryOut color='orangered' size={40}/>
            <h2>Prenez rendez-vous en ligne</h2>
            <p className="u-text-small">
              Profitez de notre service de prise de rendez-vous en ligne pour une expérience pratique et efficace. 
            </p>
        </div>
        <div className="features-content">
          <div className="features-right" data-aos="fade-right">
                  {featureListLeft.map(
                  (item) => (
                    <Onerendezvous key={item.id} icon={item.icon} heading={item.heading} text={item.text}/>
                  )
                  )}
          </div>
            <div className="features-left" data-aos="fade-left">
              <img src={rendevous} alt="cadaster" />
            </div>
        </div>
      </div>
    </section>
  )
}

export default RendezVous