import React, { useEffect, useState } from "react";
import { Box, useTheme,  Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip} from "@mui/material";
import { Modal, Form, Input, message } from 'antd';
// import { useGetAllusersQuery} from "/src/state/api";
import Header from "/src/components/Header";
import { DataGrid } from "@mui/x-data-grid";
// import { message } from "antd";
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const Znc = () => {
    const theme = useTheme();
    const [cookie, setCookie] = useState();
    const [data , setData ] = useState();

    const [selectedDemande, setSelectedDemande] = useState(null); // Pour stocker la demande sélectionnée
    const Navigate = useNavigate()
    const [open, setOpen] = useState(false); // Pour contrôler l'ouverture/fermeture du dialogue  
    // handle accepted demande
    const [isModalVisible, setIsModalVisible] = useState(false);
    // handle refused demande
    const [isRefusedModalVisible, setIsRefusedModalVisible] = useState(false)
    
    // handle info click
    const handleInfoClick = (demande) => {
      setSelectedDemande(demande); // Stocke la demande sélectionnée
      setOpen(true); // Ouvre le dialogue
    };

    // handle refused demande
    const handlRefusedClick = ()=>{
      // Navigate('/refuserDemande')
      setIsRefusedModalVisible(true);
      // setSelectedDemande(); // Stocke la demande sélectionnée
      // setOpen(true);
    }
     // Fonction pour gérer la soumission du formulaire en cas de refus
     const handleRefusedFormSubmit = async (values) => {
      // recuperer le commentaire saisie par l'agent
      console.log("values:", JSON.stringify(values));
      // selected demande
      console.log("la demande selectionner est :",selectedDemande);
      try {
        // Envoyer les données du formulaire au serveur
        const response = await axios.post('http://localhost:3000/api/demandes/response/refused', {
          reponses: values.comment, clientId: selectedDemande.clientId, demandeId: selectedDemande._id
        });
        if (response.data.success) {
          // Réponse réussie, fermez la modale
          setIsRefusedModalVisible(false);
          form.resetFields();
          message.success('Demande refuser, merci pour votre reponse');
        } else {
          // Gérer les erreurs en fonction de la réponse du serveur
          message.error('Une erreur s\'est produit vouillez ressayer');
        }
      } catch (error) {
        // Gérer les erreurs de connexion au serveur
        console.error('Erreur lors de la soumission du formulaire', error);
        message.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    };
    
    const handleRefusedCancel = () => {
      setIsRefusedModalVisible(false);
    };

    // Gérer l'état du formulaire
    const [form] = Form.useForm();
  
    // Fonction pour ouvrir la modale de réponse d'acceptation
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    // Fonction pour gérer la soumission du formulaire en cas d'acceptation
    const handleFormSubmit = async (values) => {
      // recuperer le commentaire saisie par l'agent
      console.log("values:", JSON.stringify(values));
      // selected demande
      console.log("la demande selectionner est :",selectedDemande);
      try {
        // Envoyer les données du formulaire au serveur
        const response = await axios.post('http://localhost:3000/api/demandes/response', {
          reponses: values.comment, clientId: selectedDemande.clientId, demandeId: selectedDemande._id
        });
        if (response.data.success) {
          // Réponse réussie, fermez la modale
          setIsModalVisible(false);
          form.resetFields();
          message.success('Demande acceptée avec succès');
        } else {
          // Gérer les erreurs en fonction de la réponse du serveur
          message.error('Erreur lors de l\'acceptation de la demande');
        }
      } catch (error) {
        // Gérer les erreurs de connexion au serveur
        console.error('Erreur lors de la soumission du formulaire', error);
        message.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    };
  
    // Fonction pour fermer la modale
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    // const handleRefusSubmit = ()=>{

    // }
    // for the data gride
    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Nom",
        flex: 0.5,
      },
      {
        field: "prénom",
        headerName: "Prénom",
        flex: 0.5,
      },
      {
        field: "age",
        headerName: "Age",
        flex: 0.6,
      },
      {
        field: "statutDemd",
        headerName: "Statut",
        flex: 0.6,
        renderCell: (params) => {
          return (
            <div>
              {params.value =='en atante'? 
                <Button variant="outlined" size="small"  color="warning">En attente</Button>:(params.value =='confirmer'?
                <Button variant="outlined" color="success" size="small" >Confirmer</Button>:<Button variant="outlined" color="error" size="small">Refuser</Button>)}
            </div>
            
          );
        },
      },
    //   {
    //     field: "phone",
    //     headerName: "Numero Tel",
    //     flex: 0.5,
    //     renderCell: (params) => {
    //       return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //     },
    //   },
      // {
      //   field: "manuscrite",
      //   headerName: "Doc1",
      //   flex: 0.5,
      // },
      {
        field: "manuscrite",
        headerName: "Doc1",
        flex: 0.5,
        renderCell: (params) => {
          return (
          <div>
            <img
              src={params.value} // Assurez-vous que params.value contient le lien Cloudinary
              alt="Document 1"
              style={{ width: "100px", height: "100px" }} // Ajustez la taille comme vous le souhaitez
            />
          </div>
          );
        },
      },
      {
        field: "planSituation",
        headerName: "Doc1",
        flex: 0.5,
        renderCell: (params) => {
          return (
            <img
              src={params.value} // Assurez-vous que params.value contient le lien Cloudinary
              alt="Document 1"
              style={{ width: "100px", height: "100px" }} // Ajustez la taille comme vous le souhaitez
            />
          );
        },
      },
      {
        field: "quittance",
        headerName: "Doc2",
        flex: 0.5,
        renderCell: (params) => {
          return (
            <img
              src={params.value} // Assurez-vous que params.value contient le lien Cloudinary
              alt="Document 1"
              style={{ width: "100px", height: "100px" }} // Ajustez la taille comme vous le souhaitez
            />
          );
        },
      },
      {
        field: "info",
        headerName: "Info",
        flex: 0.25,
        renderCell: (params) => (
          <InfoSharpIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleInfoClick(params.row)} // Gère le clic sur l'icône Info
          />
        ),
      },
      {
        field: "Accepter",
        headerName: "Accepter",
        flex: 0.25,
        renderCell: (params) => (
          <CheckCircleIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedDemande(params.row);
              showModal(params.row)
            }} // Gère le clic sur l'icône Info
          />
        ),
      },
      {
        field: "Refuser",
        headerName: "Refuser",
        flex: 0.25,
        renderCell: (params) => (
          <CancelIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedDemande(params.row);
              handlRefusedClick(params.row);
            }
            } // Gère le clic sur l'icône Info
          />
        ),
      },
    //   {
    //     field: "isAgent",
    //     headerName: "Agent",
    //     flex: 0.5,
    //   }
    ];
  
  const getdata = async ()=>{
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
          message.error("Vous n'êtes pas authentifié !");
      }
      setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
      const instance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
      });
      const cookies = {
          'access_token': cookie
      };
      const res = await instance.post('/api/demandes/Zncs', {},{
        headers: {
            Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
        }
      })
      setData(res.data.zncs)
      console.log(res);
  }
  useEffect(() => {
    getdata()
  },[]);
  
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Les Attestations Cadastrales" subtitle="List des demandes d'attestation cadastrale soumise par les utilisateurs " />
        <Box
              mt="40px"
              height="75vh"
              sx={{
              "& .MuiDataGrid-root": {
                  border: "none",
              },
              "& .MuiDataGrid-cell": {
                  borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
              },
              }}
          > 
              <DataGrid
                  // loading={isLoading || !data}
                  getRowId={(row) => row._id}
                  rows={data || []}
                  columns={columns}
              />
               {/* Dialogue pour afficher les détails de la demande */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                  {selectedDemande && (
                    <>
                      <DialogTitle>Détails de la demande</DialogTitle>
                        <DialogContent>
                          <div style={{ padding: "20px" }}>
                            
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Nom: </strong>
                              {selectedDemande.name}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Prénom: </strong>
                              {selectedDemande.prénom}
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                              <strong>Âge: </strong>
                              {selectedDemande.age}
                            </div>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
                            <div style={{ marginBottom: "10px", color:""}}><strong>la demande manuscrite </strong></div>
                              <a href={selectedDemande.manuscrite} download="document1.jpg">
                              <img
                                src={selectedDemande.manuscrite}
                                alt="Document 1"
                                style={{ width: "250px", height: "auto", cursor: "pointer" }}
                              />
                              </a>
                              {/* Lien de téléchargement */}
                            </div>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
                            <div style={{ marginBottom: "10px" }}><strong>le plan de situation </strong></div>
                            <a href={selectedDemande.manuscrite} download="document1.jpg">
                              <img
                                src={selectedDemande.planSituation}
                                alt="Document 2"
                                style={{ width: "250px", height: "auto" }}
                              />
                              </a>
                            </div>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
                            <div style={{ marginBottom: "10px"}}><strong>la quittance de paiement </strong></div>
                            <div>
                            <a href={selectedDemande.manuscrite} download="document1.jpg">
                              <img
                                src={selectedDemande.quittance}
                                alt="Document 3"
                                style={{ width: "250px", height: "auto" }}
                              />
                            </a>
                            </div>
                            </div>
                          </div>
                        </DialogContent>

                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Fermer</Button>
                      </DialogActions>
                    </>
                  )}
                </Dialog>

                {/* afficher le formulaire d'acceptation */}
                <Modal
                  title="Réponse d'acceptation"
                  visible={isModalVisible}
                  onOk={form.submit}
                  onCancel={handleCancel}
                >
                  <Form form={form} onFinish={handleFormSubmit}>
                    {/* Ajoutez les champs du formulaire ici */}
                    <Form.Item
                      name="comment"
                      label="Commentaire"
                      rules={[
                        {
                          required: true,
                          message: 'Veuillez entrer un commentaire',
                        },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    {/* Vous pouvez ajouter d'autres champs selon vos besoins */}
                  </Form>
                </Modal>
                
                {/* afficher le formulaire de refus */}
                <Modal
                  title="Réponse e refus"
                  visible={isRefusedModalVisible}
                  onOk={form.submit}
                  onCancel={handleRefusedCancel}
                >
                  <Form form={form} onFinish={handleRefusedFormSubmit}>
                    {/* Ajoutez les champs du formulaire ici */}
                    <Form.Item
                      name="motife"
                      label="Motife de refus"
                      rules={[
                        {
                          required: true,
                          message: 'Veuillez entrer le motife de refus de cette demande',
                        },
                      ]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    {/* Vous pouvez ajouter d'autres champs selon vos besoins */}
                  </Form>
                </Modal>
          </Box>
      </Box>
    );
  };

export default Znc;