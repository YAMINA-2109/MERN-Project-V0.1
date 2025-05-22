// import React from 'react'
import {useEffect} from 'react';
import "./Subscribe.css";
import {TiSocialGooglePlus} from 'react-icons/ti';
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Subscribe = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        })
    },[])
    return (
        <section id="subscribe">
            <div className="container subscribe" data-aos="zoom-in">
                <h2>Contactez nous!</h2>
                <form action="">
                    <div className="form-control">
                        <div className="personelinfo">
                            <input type="text" placeholder="Entrez Votre Nom" />
                            <input type="text" placeholder="Entrez Votre Prenom" />
                        </div>
                        
                        <input type="text" placeholder="Entrez Votre Email" />
                        <textarea placeholder="Entrez votre message" rows='4' cols='20'/>
                        <button>Subscribe</button>
                    </div>
                </form>
                <div className="social-icons">
                    <div className="social-icon">
                        <TiSocialGooglePlus/>
                    </div>
                    <div className="social-icon">
                        <FaFacebookF/>
                    </div>
                    <div className="social-icon">
                        <FaTwitter/>
                    </div>
                    <div className="social-icon">
                        <FaInstagram/>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Subscribe
