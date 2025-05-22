// import React from 'react'
import '../AttestationCadastrale.scss';
import { useEffect, useState } from 'react';
import { uploadServices } from '../../../../utils/Upload';
import {message} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import newDemandeRequest from '../../../../utils/newDemandeRequest';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../../redux/features/alertSlice';


const initialState ={
    name: "",
    prénom: "",
    age:"",
    ExtraitNaissance:"",
    CNI: "",
    quittance: "",
    ProcurationNotariale: "",
    fredha:""
  };

const LivretFoncier = () => {
    const [formData, setFormData] = useState(initialState);
    const { name ,prénom , age, ExtraitNaissance, CNI, quittance, ProcurationNotariale, fredha} = formData;
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);
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
            const url1 = await uploadServices(file1);
            const url2 = await uploadServices(file2);
            const url3 = await uploadServices(file3);
            const url4 = await uploadServices(file4);
            const url5 = await uploadServices(file5);
            const res = await newDemandeRequest.post("/api/demandes/registreLivret", {
              ...formData,
              ExtraitNaissance: url1, CNI: url2, quittance: url3, ProcurationNotariale: url4, fredha: url5
            },{
                headers: {
                    Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
                }
            });
            
            if (res.data.success) {
                dispatch(hideLoading());
                return message.success('Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !');
                // console.log(res.data.message);
            }else{
                dispatch(hideLoading());
                return message.error(res.data.message)
            
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
                    {/* les documents*/}
                    {/* {clientId, name ,prénom , age, ExtraitNaissance, CNI, quittance, ProcurationNotariale, fredha, statutDemd} */}
                    <label htmlFor="">Extrait de naissance des propriétaires</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='ExtraitNaissance' value={ExtraitNaissance} onChange={(e) => setFile1(e.target.files[0])}/>
                    <label htmlFor="">Copie de la carte d'identité nationale (CNI)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='CNI' value={CNI} onChange={(e) => setFile2(e.target.files[0])}/>
                    <label htmlFor="">Quittance de paiement des frais de la prestation</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='quittance' value={quittance} onChange={(e) => setFile3(e.target.files[0])}/>
                    <label htmlFor="">Procuration notariale</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='ProcurationNotariale' value={ProcurationNotariale} onChange={(e) => setFile4(e.target.files[0])}/>
                    <label htmlFor="">La fredha pour les héritiers </label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='fredha' value={fredha} onChange={(e) => setFile5(e.target.files[0])}/>
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

export default LivretFoncier;
