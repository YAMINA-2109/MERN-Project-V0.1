// import React from 'react';
import './Footer.css';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFax,
    FaEnvelope,
    FaGlobe,
} from "react-icons/fa";
import {SiAnaconda} from "react-icons/si";

const Footer = () => {
  return (
    <div className="page-container">
        <footer id="footer">
            <div className="container footer">
                <div className="footer-box">
                    <h4>liens importants</h4>
                    <div className="footer-links">
                        <a href="#">&bull; information1</a>
                        <a href="#">&bull; A propos</a>
                        <a href="#">&bull; information1</a>
                        <a href="#">&bull; information2</a>
                        <a href="#">&bull; information1</a>
                    </div>
                </div>
                <div className="footer-box">
                    <h4>Support</h4>
                    <div className="footer-links">
                        <a href="#">&bull; information1</a>
                        <a href="#">&bull; A propos</a>
                        <a href="#">&bull; information1</a>
                        <a href="#">&bull; information2</a>
                        <a href="#">&bull; information1</a>
                    </div>
                </div>
                <div className="footer-box">
                    <h4>Contacter Nous</h4>
                    <div className="footer-contact u-text-small">
                        <p><FaMapMarkerAlt /> &nbsp; Address: Algerie.</p>
                        <p><FaPhoneAlt /> &nbsp; numero: +1230 423 1231.</p>
                        <p><FaFax /> &nbsp; Fax: +12342762578</p>
                        <p><FaEnvelope /> &nbsp; Email: dccf@exmple.com</p>
                        <p><FaGlobe /> &nbsp; siteWeb: www.exmple.com</p>
                    </div>
                </div>
                <div className="footer-box">
                    <div className="dccflogo">
                        <SiAnaconda color='#fff' size={33} className='dccflogo-icon'/>
                        <p className='dccflogo-text'>DC<span>C</span>F</p>
                    </div>
                    <p className="u-text-small">&copy; Copyright 2023. Yamina ATMAOUI</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
