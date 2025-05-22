import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  // Rating,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import Header from "/src/components/Header";
import { useGetRdvQuery } from "/src/state/api";
import axios from "axios";
import { message } from "antd";

const Rendezvous = ({
  _id,
  client,
  date,
  heure,
  disponible,
  statut,
  clientName,
  clientPrenom
  // supply,
  // stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(statut);
  // const handleStatut = ()=>{

  // }
  const HandlConfirmer = async ()=>{
    setStatus("Confirmer");
    const res =await axios.post('http://localhost:3000/api/rendezVous/rdvrepons', {_id,
      client, status});
      console.log(res);
    if(res.data.success){
      message.success('votre reponse est bien envoyer. merci!')
    }else{
      message.error('votre reponse n\'est envoyer. merci!')
    }
    console.log(status);
  }

  const HandlAnnuler = async ()=>{
    setStatus("Annuler");
    const res =await axios.post('http://localhost:3000/api/rendezVous/rdvrepons', {_id,
      client, status});
      console.log(res);
    if(res.data.success){
      message.success('votre reponse est bien envoyer. merci!')
    }else{
      message.error('votre reponse n\'est envoyer. merci!')
    }
    console.log(status);
  }

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
      <Typography variant="h4" component="div" sx={{ mb: "1rem", display:"flex", justifyContent: "center"}} color={theme.palette.secondary[400]}>Rendez-Vous</Typography>
        <Typography sx={{ mb: "1rem", textTransform: "capitalize"}} variant="h5" component="div">
          Nom : {clientName}
        </Typography>
        <Typography sx={{ mb: "1rem", textTransform: "capitalize" }} variant="h5" component="div">
          Prénom : {clientPrenom}
        </Typography>
        <Typography sx={{ mb: "1rem", textTransform: "capitalize" }} variant="h5" component="div">
          Date : {date}
        </Typography>
        <Typography sx={{ mb: "1rem", textTransform: "capitalize" }} variant="h5" component="div">
          Heure : {heure}
        </Typography>
        <Typography sx={{ mb: "1rem", textTransform: "capitalize" }} variant="h5" color={theme.palette.secondary[400]}>
          statut : {status}
          {/* <Button
          variant="primary"
          size="small"
          onClick={handleStatut}
          > */}
          
          {/* </Button> */}
        </Typography>
        <Stack spacing={2} direction="row">
            <Button
            variant="contained"
            size="small"
            onClick={HandlConfirmer}
            >
            Confirmer
            </Button>
            <Button
            sx={{color:"#ffda85"}}
            variant="outlined"
            size="small"
            onClick={HandlAnnuler}
            >
            Annuler
            </Button>
          </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Voir plus
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography
          sx={{ fontSize: 14}}
          color={theme.palette.secondary[600]}
          gutterBottom
          >
            Id_Client: {client}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
);
};

const Rdv = () => {
    const { data, isLoading } = useGetRdvQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
//   console.log("hello your looking for this data? :"+data);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Rendez-Vous" subtitle="Voir votre liste de rendez-vous." />
            {data || !isLoading ? (
                <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                >
                {data.map(
                    ({
                    _id,
                    client,
                    date,
                    heure,
                    disponible,
                    statut,
                    clientName,
                    clientPrenom
                    }) => (
                    <Rendezvous
                        key={_id}
                        _id={_id}
                        client={client}
                        date={date}
                        heure={heure}
                        disponible={disponible}
                        statut={statut}
                        clientName={clientName}
                        clientPrenom={  clientPrenom}
                        
                    />
                    )
                )}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
);
};

export default Rdv;