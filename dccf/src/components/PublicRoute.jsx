import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
    if(JSON.parse(localStorage.getItem("currentUser"))){
        return <Navigate to="/"/>
    }else{
        return children;
    }
}

export default PublicRoute
