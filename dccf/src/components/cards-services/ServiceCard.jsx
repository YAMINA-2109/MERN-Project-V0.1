import React from 'react';
import './ServiceCard.css';
import {BsFillBookmarkStarFill, BsFillFileEarmarkTextFill, BsHexagon} from 'react-icons/bs';

const ServiceCard = () => {
  return (
    <section>
        <div className='devSec'>
            <div className="u-title">
                <BsFillBookmarkStarFill color='orangered' size={30} className='title-sec'/>
                <h2>Nos Services</h2>
                <p className="u-text-small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                consectetur adipisicing elit. 
                </p>
            </div>
            <div className=" industrycontainer next-dev">
                <a className="card2" href="/education">
                    <div className="feature-icon">
                        <BsHexagon color='orangered' size={35}/>
                        <div className="inner-icon">
                            <BsFillFileEarmarkTextFill color='#0a1930' size={18}/>
                        </div>
                    </div>
                    <h5>  Education Ed-Tech </h5>
                    <p className="small">Transcripts/Degree certificates ,Learning Badges,Report Cards and more usecases 	</p>
                    <hr/>    
                    <div href="#">
                        <div className="go-arrow">
                            <p>View  ↗ </p> 
                        </div>
                    </div>
                </a>
                <a className="card2" href="/ecommerce">
                    <i className="fa fa-cart-plus fa-2x " aria-hidden="true"></i>
                    <h5>  E-commerce </h5>
                    <p className="small">Warranty Cards, Proof of Authenticity , Art , Supply chain tracking and more usecases  </p>
                    <hr/>    
                    <div href="#">
                        <div className="go-arrow">
                            <p>View  ↗ 
                            </p> 
                        </div>
                    </div>
                </a>
                <a className="card2" href="/digital-badges-for-hr">
                    <i className="fa fa fa-users fa-2x " aria-hidden="true"></i>
                    <h5> HR and L&amp;D </h5>
                    <p className="small">HR letters ,Employment letters ,PaySlips ,Employee Agreements and more usecases</p>
                    <hr/>    
                    <div href="#">
                        <div className="go-arrow">
                            <p>View  ↗ 
                            </p> 
                        </div>
                    </div>
                </a>
                <a className="card2" href="/banking-Finance">
                    <i className="fa fa-usd fa-2x " aria-hidden="true"></i>
                    <h5> Finance</h5>
                    <p className="small">Bank statements,Insurance credentials,Invoices, cash cards and more usecases
                    </p>
      
                    <hr/>    
                    <div href="#">
                        <div className="go-arrow">
                            <p>View  ↗ 
                            </p> 
                        </div>
                    </div>
                </a>
                <a className="card2" href="/government">
                    <i className="fa fa-university fa-2x " aria-hidden="true"></i>
                    <h5>  Government </h5>
                    <p className="small">Birth certificates ,ID proof , Driving License, Land records and more usecases
                    </p>
                    <hr/>    
                    <div href="#">
                        <div className="go-arrow">
                            <p>View  ↗ </p> 
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>
    // <section>
    //   <div classNameName="cardSec">
    //     <div classNameName="secdetail">
    //         <div classNameName="sec-heading">
    //             <h2 classNameName='text-center'></h2>
    //         </div>
    //     </div>
    //     <div classNameName="secContainer">
    //         <a href="" classNameName="card2">
    //             <i></i>
    //             <h5></h5>
    //             <p classNameName="small">

    //             </p>
    //             <hr />
    //             <div>
    //                 .go-arr
    //             </div>
    //         </a>
    //     </div>
    //   </div>
    // </section>
  )
}

export default ServiceCard





{/* <div className="sec-detail auther-style">
                <div className="sec-heading">
                    <h2 className="text-center">Our solutions across industries</h2>
                </div>
            </div> */}