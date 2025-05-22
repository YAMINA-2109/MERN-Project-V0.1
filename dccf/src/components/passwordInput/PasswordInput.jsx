import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './PasswordInput.scss'

const PasswordInput = ({placeholder, value, onChange, name, onPaste}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () =>{
        setShowPassword(!showPassword);
    }
  return (
    <div className='password'>
      <input 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} required 
                name={name} 
                value={value} 
                onChange={onChange}
                onPaste={onPaste}
        />
        <div className="icon" onClick={togglePassword}>
            {showPassword? (
                <AiOutlineEyeInvisible size={25} />
            ) : (
                <AiOutlineEye size={25} />
            )}
        </div>
    </div>
  )
}

export default PasswordInput
