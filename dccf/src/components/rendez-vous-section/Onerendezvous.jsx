import './Onerendezvous.css';
import {BsHexagon} from 'react-icons/bs';



const Onerendezvous = ({icon, heading, text}) => {
  return (
        <div className='feature'>
            <div className="feature-icon">
                {/* <AiFillCheckSquare color='orangered' size={55}/> */}
                    <BsHexagon color='orangered' size={55}/>
                    <div className="inner-icon">
                        {/* <FaAccessibleIcon/> */}
                        {icon}
                    </div>
            </div>
            <div className="feature-text">
                    {/* <h3>Demande de renseignement</h3> */}
                    <h3>{heading}</h3>
                    <p className='u-text-small'>{text}</p>
                    {/* <p className='u-text-small'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorem iure corrupti id laboriosam quod, mollitia reprehenderit eveniet qui.</p> */}
            </div>
        </div>
  )
}

export default Onerendezvous
