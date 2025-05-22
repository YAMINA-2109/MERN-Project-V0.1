import React, { useState } from 'react';
import styles from "../auth.module.scss";
import Card from '../../../components/card/Card';
import {BiLogIn} from "react-icons/bi";
import {Link} from "react-router-dom";
import '../auth.css'
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import newRequest from '../../../utils/newRequest';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/features/alertSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const handleInputChange = ()=>{
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = async (e)=>{
    e.preventDefault();
    try {
      dispatch(showLoading())
      const res = await newRequest.post("/login", 
      {email, password});
      dispatch(hideLoading());
      console.log(res.data.currentUser);
      if(res.data.success){
        localStorage.setItem("currentUser", JSON.stringify(res.data.currentUser));
        message.success('Félicitations! Vous êtes maintenant connecté.')
        if(res.data.currentUser.isAdmin){
          navigate('/Homeadmin');
        }else{
          navigate("/");
        }
        
      }else{
        message.error(res.data.message)
      }
      
    }catch(err){
      dispatch(hideLoading());
      setError(err);
      message.error(err.response.data.message)
      console.log(err.response.data);
    }
  }
  return (
    <div className={`--container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
            <h2 className='--h2'>Login</h2>
            <div className="--flex-center">
              <button className="--btn --btn-google">
                Login With Google
              </button>
            </div>
          </div>
          <br />
          <p className='--para --text-center --fw-bold'>or</p>

          <form onSubmit={loginUser}>
            <input type="email" placeholder='Email' required name='email' value={email} onChange={e=>setEmail(e.target.value)}/>

            <PasswordInput 
              placeholder='Password'
              name='password' 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
            />
            {/* <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange}/> */}

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to="/forgot" className='--link'>Forgot Password</Link>
          <span className={styles.register}>
            <Link to='/' className='--link '>Home</Link>Don&#39;t have an account?&nbsp;<Link to='/register' className='--link'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Login
