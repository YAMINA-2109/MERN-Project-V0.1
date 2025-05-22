// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const ProtectUserRoute = () => {
//     const [cookie, setCookie] = useState();
//     // get loged user data
//     useEffect(()=>{
//         const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//           if (currentUser) {
//               setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
//           }
//           const instance = axios.create({
//             // Définir l'URL de base si nécessaire
//             baseURL: 'http://localhost:3000',
//             // Inclure les cookies avec la requête
//             withCredentials: true
//           });
//           const cookies = {
//               'access_token': cookie
//           };
//         const getUserData = async()=>{
//           try {
//             const res = await instance.post('/api/users/getUser', {},
//               {
//                 headers: {
//                   Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
//                 }
//               }
//             )
//             console.log(res);
//           } catch (error) {
//             console.log(error);
//           }
//         }
//         getUserData();
//     }, [])
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ProtectUserRoute
