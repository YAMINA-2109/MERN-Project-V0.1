// import React from 'react';
import {useEffect} from 'react';
import {FaApple, FaWindows} from 'react-icons/fa';
import {GrAndroid} from 'react-icons/gr';
import {IconContext} from 'react-icons';
import {AiFillBank} from 'react-icons/ai';
import './Dawnload.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Download = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  },[])
  return (
    <section id='download' data-aos="zoom-in">
      <div className="container download" data-aos="zoom-in">
        <h2>Nos Colaborateur</h2>
        <p className="u-text-small u-text-light">
        Découvrez notre équipe dévouée de professionnels compétents. Chaque membre apporte une expertise approfondie dans le domaine du cadastre et de la conservation foncière. Leur engagement assure des services de qualité, une gestion précise des informations et la sécurité juridique des biens immobiliers
        </p>
        <IconContext.Provider value={{size: "15"}}>
        <div className="download-icons">
          <div className="download-icon" data-aos="flip-right">
            <AiFillBank/> <p>Colab1</p>
          </div>
          <div className="download-icon" data-aos="flip-right">
            <AiFillBank/> <p>Colab</p>
          </div>
          <div className="download-icon" data-aos="flip-right">
            <AiFillBank/> <p>Colab</p>
          </div>
        </div>
        </IconContext.Provider>
      </div>
    </section>
  )
}

export default Download
