import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid} from '@mui/material';
import axios from 'axios';
import newRequest from '../../utils/newRequest';
import newDemandeRequest from '../../utils/newDemandeRequest';


const MesDemandes = () => {
    const [demandes, setDemandes] = useState([]);
    const [cookie, setCookie] = useState();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Chargez les demandes de l'utilisateur depuis l'API ou la base de données ici

  useEffect(() => {
    // Remplacez cette partie par l'appel à l'API ou à la base de données
    const fetchData = async () => {
      try {
        if (currentUser) {
            setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
        }
        const cookies = {
            'access_token': cookie
        };
        // Remplacez cette ligne par l'appel à l'API ou à la base de données
        const response = await newDemandeRequest.post("/api/demandes/mesDemandes",
            {
                headers: {
                    Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
            }
          } );
        console.log(response.data);
        if (response.data.succes) {
          setDemandes(response.data.listDemandes);
        } else {
          console.error('Erreur lors de la récupération des demandes');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ padding: '150px' }}>
    <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem' }}>
      Mes Demandes
    </Typography>
    <Grid container spacing={3}>
      {demandes.map((demande) => (
        <Grid item xs={12} sm={6} md={4} key={demande.demandeId}>
          <Paper elevation={3} sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.4rem' }}>
              Type de demande: {demande.typeDemande}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: '8px', color: 'primary.main', fontSize: '1.2rem' }}>
              Statut: {demande.statut}
            </Typography>
            {demande.demandeResponse && (
              <Typography variant="body2" sx={{ marginTop: '8px', color: 'secondary.main', fontSize: '1.2rem' }}>
                Message de réponse: {demande.demandeResponse}
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
//     <Container sx={{padding: '25%'}}>
//         <Typography variant="h4" gutterBottom>
//         Mes Demandes
//         </Typography>
//         <Grid container spacing={3}>
//         {demandes.map((demande) => (
//             <Grid item xs={12} sm={6} md={4} key={demande.demandeId}>
//             <Paper elevation={3} style={{ padding: '16px' }}>
//                 <Typography variant="subtitle1">Type de demande: {demande.typeDemande}</Typography>
//                 {/* <Typography variant="body2">Date de création: {demande.dateCreationDemande}</Typography> */}
//                 <Typography variant="body2">Statut: {demande.statut}</Typography>
//                 {demande.demandeResponse && (
//                 <Typography variant="body2">Message de réponse: {demande.demandeResponse}</Typography>
//                 )}
//             </Paper>
//             </Grid>
//         ))}
//         </Grid>
//   </Container>
  );
};

export default MesDemandes;

