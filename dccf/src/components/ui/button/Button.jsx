// import React from 'react';
import './Button.css';

// eslint-disable-next-line react/prop-types
const Button = ({href, btnClass, text}) => {
  return (
    <a href={href} className={`btn ${btnClass}`}>{text}</a>
  )
}

export default Button
