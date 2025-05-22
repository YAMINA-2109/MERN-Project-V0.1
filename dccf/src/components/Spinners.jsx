import {useState} from 'react';
import './Spinners.css';
// import { useState, CSSProperties } from "react";
import FadeLoader from "react-spinners/FadeLoader";

// const override = {
//     // display: "block",
//     margin: "0 auto",
//     // borderColor: "red",
//     height: "10vh",
//     width: "30%",
//     display: "flex",
//     alignItems:"center",
//     justifyContent:'center',
//     zIndex: "9999",
//     backgroundColor: "black"


//   };

const Spinners = () => {
    let [loading, setLoading] = useState(true);
//   let [color, setColor] = useState("#ffffff");
    return (
        <div className='firstDiv'>
            <div role='status'>
            <FadeLoader color="#36d7b7" />
            </div>
        </div>
    )
}

export default Spinners


    // <div className="sweet-loading">
    // <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
    // <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />
    // <div className='d-flex justify-content-center spinner'>
    //     <div className='spinner-border'>

    //     </div>
    // </div>
    // <ClipLoader
    //   color={color}
    //   loading={loading}
    //   cssOverride={override}
    //   size={150}
    //   aria-label="Loading Spinner"
    //   data-testid="loader"
    //   className='override'
    // />