// import React from 'react'
import '../AttestationCadastrale.scss';
import { useEffect, useState } from 'react';
import { uploadServices } from '../../../../utils/Upload';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import newDemandeRequest from '../../../../utils/newDemandeRequest';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../../redux/features/alertSlice';


const initialState ={
    name:"", 
    prénom:"", 
    age:"", 
    plansDeMasse:"", 
    rapportExpertise:"", 
    ExtraitNaissance:"", 
    ouvertureEnquêteFoncière:"", 
    DéclarationVente:"", 
    DéclarationDonation:"", 
    fredha:"", 
    procurationNotariale:"", 
    déclarationHonneur:"", 
    déclarationDexistence:"", 
    certificatPossession:"", 
};
const EnqueteFoncier = () => {
    const [formData, setFormData] = useState(initialState);
    const {
        name, prénom, age, plansDeMasse, rapportExpertise, ExtraitNaissance, ouvertureEnquêteFoncière, DéclarationVente, DéclarationDonation, fredha, procurationNotariale, déclarationHonneur, déclarationDexistence, certificatPossession
    } = formData;
    const [plansDeMasseFile, setPlansDeMasseFile] = useState(null);
    const [rapportExpertiseFile, setRapportExpertiseFile] = useState(null);
    const [extraitNaissanceFile, setExtraitNaissanceFile] = useState(null);
    const [ouvertureEnquêteFoncièreFile, setOuvertureEnquêteFoncièreFile] = useState(null);
    const [déclarationHonneurFile, setDéclarationHonneurFile] = useState(null);
    const [déclarationVenteFile, setDéclarationVenteFile] = useState(null);
    const [déclarationDonationFile, setDéclarationDonationFile] = useState(null);
    const [fredhaFile, setFredhaFile] = useState(null);
    const [procurationNotarialeFile, setProcurationNotarialeFile] = useState(null);
    const [déclarationDexistenceFile, setDéclarationDexistenceFile] = useState(null);
    const [certificatPossessionFile, setCertificatPossessionFile] = useState(null);
    const [cookie, setCookie] = useState();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData,[name]: value});
    };

    const handlRetourn = ()=>{
        navigate('/service')
    }
    const handlSoumition = async (e)=>{
        e.preventDefault();

        if (currentUser) {
            setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
        }
        const cookies = {
            'access_token': cookie
        };
        try {
            dispatch(showLoading())
            const urlplansDeMasse = await uploadServices(plansDeMasseFile);
            const urlrapportExpertise = await uploadServices(rapportExpertiseFile);
            const urlextraitNaissance = await uploadServices(extraitNaissanceFile);
            const urlouvertureEnquête = await uploadServices(ouvertureEnquêteFoncièreFile);
            const urldéclarationHonneur = await uploadServices(déclarationHonneurFile);
            const urldéclarationVente = await uploadServices(déclarationVenteFile);
            const urldéclarationDonation = await uploadServices(déclarationDonationFile);
            const urlfredha = await uploadServices(fredhaFile);
            const urlprocurationNotariale = await uploadServices(procurationNotarialeFile);
            const urldéclarationDexistence = await uploadServices(déclarationDexistenceFile);
            const urlcertificatPossession = await uploadServices(certificatPossessionFile);
            const res = await newDemandeRequest.post("/api/demandes/registreEnquetFncr", {
              ...formData,
              plansDeMasse: urlplansDeMasse, rapportExpertise: urlrapportExpertise, ExtraitNaissance: urlextraitNaissance, ouvertureEnquêteFoncière:urlouvertureEnquête, DéclarationVente: urldéclarationVente, DéclarationDonation: urldéclarationDonation, fredha: urlfredha, procurationNotariale: urlprocurationNotariale, déclarationHonneur: urldéclarationHonneur, déclarationDexistence: urldéclarationDexistence, certificatPossession: urlcertificatPossession
            },{
                headers: {
                    Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
                }
            });
            dispatch(hideLoading());
            console.log(res);
            if (res.data.success) {
              message.success(res.data.message);
            }else{
                dispatch(hideLoading());
                message.error(res.data.message)
            
            }

          } catch (err) {
            dispatch(hideLoading());
            message.error(err.response.data.message)
            console.log(err);
          }

    }
  return (
    <div className="att">
        <div className="container">
            <h1>Formulaire de demande</h1>
            <div className="sections">
                <div className="left">
                    <label htmlFor="">Votre nom</label>
                    <input type="text" placeholder='Veuillez Saisir Votre Nom' required name='name' value={name} onChange={handleInputChange}/>
                    <label htmlFor="">Votre prénom</label>
                    <input type="text" placeholder='Veuillez Saisir Votre Prénom' required name='prénom' value={prénom} onChange={handleInputChange}/>
                    <label htmlFor="">Votre age</label>
                    <input type="text" placeholder='Veuillez Saisir Votre Age' required name='age' value={age} onChange={handleInputChange}/>
                    <label htmlFor="">Plan de masse et de situation délivré par un géomètre agréé</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name=' plansDeMasse' value={ plansDeMasse} onChange={(e) => setPlansDeMasseFile(e.target.files[0])}/>
                    <label htmlFor="">Rapport d'expertise</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='rapportExpertise' value={rapportExpertise} onChange={(e) => setRapportExpertiseFile(e.target.files[0])}/>
                    <label htmlFor="">Extrait de naissance de propriétaire</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='ExtraitNaissance' value={ExtraitNaissance} onChange={(e) => setExtraitNaissanceFile(e.target.files[0])}/>
                    <label htmlFor="">Demande d'ouverture d'enquête foncière égalisée auprès de l'APC</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='ouvertureEnquêteFoncière' value={ouvertureEnquêteFoncière} onChange={(e) => setOuvertureEnquêteFoncièreFile(e.target.files[0])}/>
                    <label htmlFor="">Déclaration de vente égalisée</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='DéclarationVente' value={DéclarationVente} onChange={(e) => setDéclarationVenteFile(e.target.files[0])}/>
                    <label htmlFor="">Une fredha (dans le cas échéant)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='fredha' value={fredha} onChange={(e) => setFredhaFile(e.target.files[0])}/>
                    <label htmlFor="">Procuration notariale ou consulaire(dans le cas échéant)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='procurationNotariale' value={procurationNotariale} onChange={(e) => setProcurationNotarialeFile(e.target.files[0])}/>
                    <label htmlFor="">Déclaration sur l'honneur en cas de CP</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='déclarationHonneur' value={déclarationHonneur} onChange={(e) => setDéclarationHonneurFile (e.target.files[0])}/>
                    <label htmlFor="">Déclaration de l'existence établie par l'APC</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='déclarationDexistence' value={déclarationDexistence} onChange={(e) => setDéclarationDexistenceFile(e.target.files[0])}/>
                    <label htmlFor="">Certificat de possession identique par rapport à l'expertise (Établi par le géomètre)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='certificatPossession ' value={certificatPossession } onChange={(e) => setCertificatPossessionFile(e.target.files[0])}/>
                    <label htmlFor="">Déclaration de donation ou de partage</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='DéclarationDonation' value={DéclarationDonation} onChange={(e) => setDéclarationDonationFile(e.target.files[0])}/>
                
                    <div className="btn-Dm">
                        <button onClick={handlRetourn}>Retourner aux services</button>
                        <button type='submit' onClick={handlSoumition}>Soumettre mon dossier</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EnqueteFoncier;
