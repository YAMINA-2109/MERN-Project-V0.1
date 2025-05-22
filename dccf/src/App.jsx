// import { useState } from 'react'
import Home  from'./pages/home/Home';
// import Services from './pages/servces/Service';
// import About from './pages/about/About';
import RendezVous from './pages/rendez-vous/RendezVous';
import About from './pages/about/About';
import Blog from './pages/blog/Blog';
import Map from './pages/map/Map';
import Message from './pages/messenger/Message';
import Service from './pages/servces/Service';
import Login from './pages/authentification/login/Login';
import Register from './pages/authentification/register2/Register';
import AttestationCadastrale from'./pages/servces/demandes/attestationCadastrale/AttestationCadastrale'
// import Register from './pages/authentification/register-notused/Register';
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import './App.css'
import List from './components/list/List';
import AdminHome from './pages/AdminHome';
import {useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Homeadmin from './Admin/Homeadmin';
import LivretFoncier from './pages/servces/demandes/livret-foncier/LivretFoncier';
import Znc from './pages/servces/demandes/regularisation/Znc';
import DeclarationInconu from './pages/servces/demandes/inconu/DeclarationInconu';
import EnqueteFoncier from './pages/servces/demandes/enquet-fonciere/EnqueteFoncier';
import MesDemandes from './pages/servces/MesDemandes';

function App() {
  const {loading } = useSelector(state=> state.alerts);
  const Layout = ()=>{
    
    return (
      <div className='app'>
        {loading?<Spinners/>:(
          <>
            <Navbar/>
            <Outlet/>
            <Footer/>
          </>
        )}
      </div>
      
    )
  }
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:
          // <ProtectedRoute>
            <Home/> 
          // </ProtectedRoute>
        },
        {
          path: '/mesDemandes',
          element:<MesDemandes/> 
        },
        {
          path: '/mesRendezVous',
          element:<MesDemandes/> 
        },
        {
          path:'/rendezVous',
          element:<RendezVous/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/blog',
          element:<Blog/>
        },
        {
          path:'/service',
          element:<Service/>
        },
        {
          path:'/message',
          element:<Message/>
        },
        {
          path:'/map',
          element:<Map/>
        },
      ]
    },
    
    {
      path:'/login',
      element:
      <PublicRoute>
        {loading?<Spinners/>:(
          <Login/>
        )}
      </PublicRoute>
      
    },
    {
      path:'/register',
      element:
      <PublicRoute>
        {loading?<Spinners/>:(
          <Register/>
        )}
      </PublicRoute>
    },
    {
      path:'/demande/attestationCadastrelle',
      element:
      <>
        {loading?<Spinners/>:(
          <AttestationCadastrale/>
        )}
      </>
    },
    {
      path:'/demande/livretFoncier',
      element:
      <>
        {loading?<Spinners/>:(
          <LivretFoncier/>
        )}
      </>
    },
    {
      path:'/demande/inconu',
      element:
      <>
        {loading?<Spinners/>:(
          <DeclarationInconu/>
        )}
      </>
    },
    {
      path:'/demande/znc',
      element:
      <>
        {loading?<Spinners/>:(
          <Znc/>
        )}
      </>
    },
    {
      path:'/demande/enquete',
      element:
      <>
        {loading?<Spinners/>:(
          <EnqueteFoncier/>
        )}
      </>
    },
    {
      path: '/Homeadmin',
      element:
      <>
        {loading?<Spinners/>:(
          <Homeadmin/> 
        )}
      </>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}


export default App




{/* <main>
<header className="header-bg">
  <Navbar/>
  <Header/>
</header>
<Home/>
<RendezVous name='thiziri' color='blue'/>
<Footer/>
</main> */}


// // import { useState } from 'react'
// import Home  from'./pages/home/Home';
// // import Services from './pages/servces/Service';
// // import About from './pages/about/About';
// import RendezVous from './pages/rendez-vous/RendezVous';
// import About from './pages/about/About';
// import Blog from './pages/blog/Blog';
// import Map from './pages/map/Map';
// import Message from './pages/messenger/Message';
// import Service from './pages/servces/Service';
// import Login from './pages/authentification/login/Login';
// import Register from './pages/authentification/register2/Register';
// import AttestationCadastrale from'./pages/servces/demandes/attestationCadastrale/AttestationCadastrale'
// // import Register from './pages/authentification/register-notused/Register';
// import Footer from './components/footer/Footer'
// import Navbar from './components/navbar/Navbar'
// import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
// import './App.css'
// import List from './components/list/List';
// import AdminHome from './pages/AdminHome';
// import {useSelector } from 'react-redux';
// import Spinners from './components/Spinners';

// function App() {
//   const {loading } = useSelector(state=> state.alerts);
//   const Layout = ()=>{
    
//     return (
//       <div className='app'>
//         {loading?<Spinners/>:(
//           <>
//             <Navbar/>
//             <Outlet/>
//             <Footer/>
//           </>
//         )}
//       </div>
      
//     )
//   }
//   const router = createBrowserRouter([
//     {
//       path:'/',
//       element:<Layout/>,
//       children:[
//         {
//           path:'/',
//           element:<Home/> 
//         },
//         // {
//         //   path: '/Admin',
//         //   element:<AdminHome/> 
//         // },
//         {
//           path:'/rendezVous',
//           element:<RendezVous/>
//         },
//         {
//           path:'/about',
//           element:<About/>
//         },
//         {
//           path:'/blog',
//           element:<Blog/>
//         },
//         {
//           path:'/service',
//           element:<Service/>
//         },
//         {
//           path:'/message',
//           element:<Message/>
//         },
//         {
//           path:'/map',
//           element:<Map/>
//         },
//       ]
//     },
    
//     {
//       path:'/login',
//       element:<Login/>
//     },
//     {
//       path:'/register',
//       element:<Register/>
//     },
//     {
//       path:'/demande/attestationCadastrelle',
//       element:<AttestationCadastrale/>
//     },
//     {
//       path: '/Admin',
//       element:<AdminHome/> 
//     }
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   )
// }


// export default App
