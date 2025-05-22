import React, {useEffect} from 'react';
import axios from 'axios'
import newRequest from '../utils/newRequest';

const AdminHome = () => {
    // login user data
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const getUserData =async()=>{
        try {
            const res = await newRequest.post('/getUser',{currentUser});
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        getUserData()
    },[])
  return (
    <div>
      Admine dashboard
    </div>
  )
}

export default AdminHome
