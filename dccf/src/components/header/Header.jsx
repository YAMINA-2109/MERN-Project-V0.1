import {useEffect} from 'react'
import "./Header.css";
import {accuil} from '../../assets/index'
import Button from "../ui/button/Button";
import '../ui/button/Button.css';
import {BsMouse} from "react-icons/bs";
import { Link } from 'react-router-dom';

import AOS from 'aos';

import 'aos/dist/aos.css';

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  },[])
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>Gérez vos demandes et rendez-vous en ligne </span>
            <span>de manière efficace</span>
            {/* <span>MESSAGING SYSTEM</span> */}
          </h1>
          <p className="u-text-small u-text-light">Notre plateforme en ligne est conçue pour faciliter vos interactions avec la direction du cadastre et de la conservation foncière de la wilaya de Béjaïa. Profitez de fonctionnalités avancées pour soumettre vos demandes, suivre leur statut en temps réel et prendre rendez-vous avec nos agents compétents</p>
          <div className="header-cta">
            <Link to={'/service'}>
            <Button text = {'Découvrir nos services'} btnClass={'btn-dark'} href= {'#'}/>
            </Link>
            <Link to={'/register'}>
              <Button text = {'Commencer maintenant'} btnClass={'btn-orange'} href= {'#'}/>
            </Link>
        </div>
        </div>
        <div className="header-right" data-aos="fade-left">
          {/* <img src={dccfphoto} alt="photo" /> */}
          <img src={accuil} alt="photo" />
        </div>
      </div>
      {/* floating-icon */}
      <div className="floating-icon">
        <a href="#features">
          <BsMouse size={25} color="#fff" className="mouse"/>
        </a>
      </div>
      <div className='plusDev'>

      </div>
    </section>
  )
}

export default Header
