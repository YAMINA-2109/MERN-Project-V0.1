import React, { useEffect, useState } from 'react';
import './Layout.css';
import {SiAnaconda} from "react-icons/si";
import {SidebarMenu} from "./data/data";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Layout = ({children}) => {
  // const {user} = useSelector(state=> state.user)
  const location = useLocation();
  const [cookie, setCookie] = useState();
  const [user, setUser] = useState();
  // get loged user data
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if(!currentUser){
    setUser(currentUser)
  }      

  return (
    <div className='mainadmin'>
      <div className="layoutadmin">
        <div className="sidebaradmin">
            <div className="dccflogoadmin">
              <SiAnaconda color='#fff' size={25} className='dccflogoadmin-icon'/>
              <p className='dccflogoadmin-text'>DC<span>C</span>F</p>
            </div>
            <hr />
            <div className="menuadmin">
                {
                  SidebarMenu.map(element=>{
                    const isActive = location.pathname === element.path ;
                    return(
                      <>
                        <div className={`menuadmin-item ${isActive && "activeAdmin"}`}>
                          <i>{element.icon}</i>
                          <Link to={element.path}>
                          {element.name}
                          </Link>
                        </div>
                      </>
                    ) 
                  })
                }
            </div>
        </div>
        <div className="contentadmin">
            <div className="headeradmin">
              <div className="headeradmin-content">
                <i></i>
                {user?(<a href='/profile'>{user.name}</a>):(<Navigate to="/login"/>)}
                
              </div>
            </div>
            <div className="bodyadmin">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
