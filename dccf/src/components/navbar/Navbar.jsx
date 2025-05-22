import {useState} from 'react'
import './Navbar.css';
import {SiAnaconda} from "react-icons/si";
import {AiOutlineBars} from "react-icons/ai";
import {RiCloseLine} from "react-icons/ri";
import  Button from '../ui/button/Button';
import '../ui/button/Button.css';
import {Link, useNavigate} from 'react-router-dom';
import photo from '../../assets/rob.png';
import newRequest from '../../utils/newRequest';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = ()=>{
    setShowMenu(!showMenu);
  }
  // open the user menu
  const [open, setOpen] = useState(false);

  // currentUser:
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  // {
  //   id:1,
  //   name: "Yamina",
  //   prénom: "atmaoui"
  //   // isSaller: true
  // }
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try {
      await newRequest.get('/logout');
      localStorage.setItem("currentUser", null);
      // navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className='container navbar'>
      <Link to={'/'}>
        <div className="dccflogo">
          <SiAnaconda color='#fff' size={33} className='dccflogo-icon'/>
          <p className='dccflogo-text'>DC<span>C</span>F</p>
        </div>
      </Link>
      <menu>
        <ul className="nav-links"  id={showMenu? "nav-links-mobile": "nav-links-mobile-hide"}>
          <Link to={'/'}>
            <li><a>Accuiel</a></li>
          </Link>
          <Link to={'/service'}>
            <li><a>Services</a></li>
          </Link>
          <Link to={'/about'}>
            <li><a>A propos</a></li>
          </Link>
          <Link to={'/rendezVous'}>
            <li><a>Rendez-Vous</a></li>
          </Link>
          <Link to={'/blog'}>
            <li><a>Actualités</a></li>
          </Link>
          {/* <li><a href="#" className='btn btn-dark'>Connexion</a></li>
          <li className='nav-btn'><a href="#" className='btn btn-dark '>Inscription</a></li> */}
          {!currentUser&&
            <>
              <Link to={'/login'}>
                <li className='nav-btn'>
                  <Button text = {'Connexion'} btnClass={'btn-dark'}/>
                </li> 
              </Link>
              <Link to={'/register'}>
                <li className='nav-btn'>
                  <Button text = {'Inscription'} btnClass={'btn-dark'}/>
                </li> 
              </Link>
            </>
          }

          {currentUser && (
                <div className="user" onClick={()=>setOpen(!open)}>
                  <img src={currentUser.photo} alt="user"/> {/*currentUser.img ||*/}
                  <li><a>{currentUser.name+" "+currentUser.prénom}</a></li>
                {open && <div className="options">
                    {
                      // currentUser && (
                        <>
                        <Link to = '/profile' className="link">Mon Profile</Link>
                        <Link to = '/mesRendezVous' className="link">Mes Rendez-vous</Link>
                        <Link to = '/mesDemandes' className="link">Mes demandes</Link>
                        <Link to = '/message' className="link">Mes Messages</Link>
                        <Link className="link" onClick={handleLogout}>Se Déconnecté</Link>
                        </>
                    }
                  </div>}
                </div>
              )}
          
        </ul>
      </menu>
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? <RiCloseLine color='#fff' size={30}/> : <AiOutlineBars color='#fff' size={27}/> }
      </div>
    </nav>
  )
}

export default Navbar
