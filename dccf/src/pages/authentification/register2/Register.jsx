import { useEffect, useState } from 'react';
import styles from "../auth.module.scss";
import Card from '../../../components/card/Card';
import {TiUserAddOutline} from "react-icons/ti";
import {FaTimes} from "react-icons/fa"
// import { BiListCheck } from 'react-icons/bi';
import { BsCheck2All } from 'react-icons/bs';
import {Link} from "react-router-dom";
import '../auth.css'
import PasswordInput from '../../../components/passwordInput/PasswordInput';
import {upload} from "../../../utils/Upload";
import newRequest from "../../../utils/newRequest";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/features/alertSlice';


const initialState ={
  name: "",
  prénom: "",
  email:"",
  password:"",
  password2:"",
  photo: "",
  pays: "",
  phone:""
};
const Register = ()=>{
  const [formData, setFormData] = useState(initialState);
  const {name, prénom, email, password, password2, photo, pays, phone} = formData;
  const [error, setError] = useState(false);

  const [uCase, setUCase] = useState(false)
  const [num, setNum] = useState(false)
  const [sChar, setSChar] = useState(false)
  const [passLength, setPassLength] = useState(false)
  const [file, setFile] = useState(null);
  const timesIcon = <FaTimes color='red' size = {15} />
  const checkIcon = <BsCheck2All color='green' size={15}/>

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }else{
      return timesIcon;
    }
  };
  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setFormData({...formData,[name]: value});
  };
  useEffect(() => {
    // Check Lower and UpperCase
    if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
        setUCase(true);
    }else{
      setUCase(false);
    }

    // Check For Numbers
    if(password.match(/([0-9])/)){
      setNum(true);
    }else{
      setNum(false);
    }
    // Check For Special char
    if(password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){
      setSChar(true);
    }else{
      setSChar(false);
    }
    //Chek for if it more than 6 character
    if (password.length >5) {
      setPassLength(true);
    }else{
      setPassLength(false)
    }
  }, [password])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUser = async(e)=>{
    e.preventDefault();
    const url = await upload(file);

    try {
      dispatch(showLoading())
      const res = await newRequest.post("/register", {
        ...formData,
        photo: url,
      });
      dispatch(hideLoading())
      if (res.data.success) {
        message.success('Votre compte est bien créé.')
        navigate("/login")
      }else{
        message.error(res.data.message)
      }
      // console.log(user);
    } catch (err) {
      dispatch(showLoading())
      setError(err);
      message.error(err.response.data.message)
      // console.log(user);
      // message.error("Une erreur s'est produite, veuillez vérifier vos informations")
      console.log(err);
    }
  }
return (
  <div className={`--container ${styles.auth}`}>
    <Card>
      <div className={styles.form}>
        <div className="--flex-center">
          <TiUserAddOutline size={35} color="#999" />
        </div>
        <h2 className='--h2'>Register</h2>
        <form onSubmit={registerUser}>
          <input type="text" placeholder='nom' required name='name' value={name} onChange={handleInputChange}/>

          <input type="text" placeholder='prénom' required name='prénom' value={prénom} onChange={handleInputChange}/>

          <input type="email" placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>

          <PasswordInput 
            placeholder='Password'
            name='password' 
            value={password} 
            onChange={handleInputChange}
          />
          <PasswordInput 
            placeholder='Confirm Password'
            name='password2' 
            value={password2} 
            onChange={handleInputChange}
          />
          <input
            name="pays"
            value={pays} 
            type="text"
            placeholder="Algérie"
            onChange={handleInputChange}
          />
          <input
            name="phone"
            value={phone}
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleInputChange}
          />
          <input 
            name="photo"
            value={photo} type="file" onChange={(e) => setFile(e.target.files[0])} />
          {/* Password Strength */}
          <Card cardClass={styles.group}>
            <ul className='--ul form-list'>
              <li>
                <span className={`${styles.indicator}`}>
                  {switchIcon(uCase)}
                  &nbsp; Lowercase & Uppercase
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(num)}
                  &nbsp; Number (0-9)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(sChar)}
                  &nbsp; Special Character (!@#$%^&*)
                </span>
              </li>
              <li>
                <span className={styles.indicator}>
                  {switchIcon(passLength)}
                  &nbsp; At least 6 Character
                </span>
              </li>
            </ul>
          </Card>

          <button type='submit' className='--btn --btn-primary --btn-block'>
            Register
          </button>
        </form>
        <span className={styles.register}>
          <Link to='/' className='--link'>Home</Link>
          <p>&nbsp; Already have an account?&nbsp;</p> <Link to='/login' className='--link'>Login</Link>
        </span>
      </div>
    </Card>
  </div>
)
}

export default Register;


// try {
      //   const res = await axios.post("http://localhost:3000/api/users/register", 
      //   {name, prénom, email, password, password2, pays, phone, photo: url}, {withCredentials: true});
      //   console.log(res.data);
      // }catch(err){
      //   setError(err);
      //   console.log(err);
      // }