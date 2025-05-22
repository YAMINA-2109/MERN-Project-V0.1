// import React from 'react'
import {useEffect} from 'react';
// import {BsFillBookmarkStarFill} from 'react-icons/bs';
import {MdOutlineLibraryBooks} from 'react-icons/md'
import './Features.css';
// import { cadaster3,} from '../../assets/index'
import Feature from './Feature';
import featureList from './data.jsx';
// import featureListLeft from './dataLeft.jsx';
// import featureListCenter from './featureListCenter.jsx'
import { services, services2 } from '../../assets';

import AOS from 'aos';
import 'aos/dist/aos.css';


const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  },[])
  return (
    <section id='features'>
      <div className="container features">
        <div className="u-title">
            {/* <BsFillBookmarkStarFill color='orangered' size={30}/> */}
            <MdOutlineLibraryBooks color='orangered' size={40}/>
            <h2>Nos Services</h2>
            <p className="u-text-small">
            Découvrez nos services spécialisés en cadastre et en conservation foncière pour répondre à vos besoins.
            </p>
        </div>
        <div className="features-content">
            <div className="features-left" data-aos="fade-right">
              <img src={services2} alt="cadaster" />
            </div>
            <div className="features-right" data-aos="fade-left">
              {featureList.map(
                (item) => (
                  <Feature key={item.id} icon={item.icon} heading={item.heading} text={item.text}/>
                )
              )}
              {/* <Feature/> */}
            </div>
           
        </div>
      </div>
    </section>
  )
}

export default Features
