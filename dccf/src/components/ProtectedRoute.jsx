import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';


const ProtectedRoute = ({children}) =>{
    // const dispatch = useDispatch();
    // const {user} = useSelector(state => state.user)

    // get user
    // const [cookie, setCookie] = useState();
    // get loged user data
        // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // if (currentUser) {
        //       setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
        // }
        // const instance = axios.create({
        //     // Définir l'URL de base si nécessaire
        //     baseURL: 'http://localhost:3000',
        //     // Inclure les cookies avec la requête
        //     withCredentials: true
        // });
        // const cookies = {
        //     'access_token': cookie
        // };
        // const getUserData = async()=>{
        //   try {
        //     const res = await instance.post('/api/users/getUser', {},
        //       {
        //         headers: {
        //           Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
        //         }
        //       }
        //     )
        //     dispatch(hideLoading);
        //     if(res.data.success){
        //         dispatch(setUser(res.data.currentUser))
        //     }else{
        //         <Navigate to="/login"/>
        //     }
        //   } catch (error) {
        //     dispatch(showLoading);
        //     console.log(error);
        //   }
        // }
        // useEffect(()=>{
        //     if(!user){
        //         getUserData()
        //     }
        // }, [user, getUserData])
    if(JSON.parse(localStorage.getItem("currentUser")).token){
        return children;
    }else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoute
