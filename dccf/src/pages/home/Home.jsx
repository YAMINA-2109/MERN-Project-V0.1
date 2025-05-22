import {useEffect, useState} from 'react'
import Features from '../../components/features/Features'
import Download from '../../components/collaborateur/Download'
import Subscribe from '../../components/contactez-nous/Subscribe'
import Faq from '../../components/a-propos-de-nous/Faq'
import ServiceCard from '../../components/cards-services/ServiceCard'
import RendezVous from '../../components/rendez-vous-section/RendezVous'
import Header from '../../components/header/Header'
import axios from 'axios';


const Home = () => {
  const [cookie, setCookie] = useState();
  // get loged user data
  useEffect(()=>{
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
        }
        const instance = axios.create({
          // Définir l'URL de base si nécessaire
          baseURL: 'http://localhost:3000',
          // Inclure les cookies avec la requête
          withCredentials: true
        });
        const cookies = {
            'access_token': cookie
        };
      const getUserData = async()=>{
        try {
          const res = await instance.post('/api/users/getUser', {},
            {
              headers: {
                Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
              }
            }
          )
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
      getUserData();
  }, [])
  return (
    <main>
    <div className="header-bg">
        <Header />
    </div>
    <Features/>
    {/* <ServiceCard/> */}
    {/* <div className='feature2-bg'>
      <RendezVous/>
    </div> */}
    <RendezVous/>
    <Download/>
    <Subscribe/>
    <Faq/>
  </main>
  )
}

export default Home
