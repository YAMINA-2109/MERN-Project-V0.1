import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Dashboard from "/src/scenes/dashboard";
import Layout from "/src/scenes/layout";
import { themeSettings } from "/src/theme";
import Rdv from "/src/scenes/rendezVous";
import Allusers from "/src/scenes/customers";
import Transactions from "/src/scenes/transactions";
import Login from "/src/pages/Login";
// import CreatePost from "/src/scenes/publications/CreatePost2";
import AttestionCadastrales from "/src/pages/demandes/AttestationCadastrales";
import FormulaireAcceptation from "/src/components/FormulaireAcceptation";
import FormulaireRefus from "/src/components/FormulaireRefus";
import LivretFonciere from "/src/pages/demandes/LivretFonciere";
import Znc from "/src/pages/demandes/Znc";
import EnquetesFonciere from "/src/pages/demandes/EnquetesFonciere";
import CreatePost from "/src/scenes/publications/CreatePost";

function App() {
  const mode = useSelector((state)=> state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode]);
  const router = createBrowserRouter([
        {
          path:'/',
          element:<Login/>,
          children:[
            {
              path:'/login',
              element:<Navigate to="/login" replace/>
            },
          ]
        },
        {
          path:'/',
          element:<Layout/>,
          children:[
            {
              path:'/dashboard',
              element:<Dashboard/>
            },
            {
              path:'/rendez-vous',
              element:<Rdv/>
            },
            {
              path:'/utilisateurs',
              element:<Allusers/>
            },
            {
              path:'/attestationscadastrales',
              element:<AttestionCadastrales/>
            },
            {
              path:'/livretsfonciers',
              element:<LivretFonciere/>
            },
            {
              path:'/enquêtesfoncières',
              element:<EnquetesFonciere/>
            },
            {
              path:'/znc',
              element:<Znc/>
            },
            {
              path:'/inconnu',
              element:<Transactions/>
            },
            {
              path:'/publications',
              element:<Transactions/>
            },
            {
              path:'/ajouterPost',
              element:<CreatePost/>
            },
          ]
        },
          // {
          //     path:'/ajouterPost',
          //     element:<CreatePost/>
          // },
          {
            path:'/accepterDemande',
            element:<FormulaireAcceptation/>
          },
          {
            path:'/refuserDemande',
            element:<FormulaireRefus/>
          },
  ])
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router} />
      </ThemeProvider>
  )
}

export default App;