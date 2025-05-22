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


const initialState ={name: "", prénom: "", age:"", ExtraitNaissance:"", CNI:"", DemandeDesInfos:"", documents:"", CopieIlot:"", fredha:"", plansDeMasse:""};

const DeclarationInconu = () => {
    const [formData, setFormData] = useState(initialState);
    const { name ,prénom , age, ExtraitNaissance, CNI, DemandeDesInfos, documents, CopieIlot, fredha, plansDeMasse} = formData;
    
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);
    const [file6, setFile6] = useState(null);
    const [file7, setFile7] = useState(null);
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
            const url6 = await uploadServices(file6);
            const url7 = await uploadServices(file7);
            const res = await newDemandeRequest.post("/api/demandes/registreInconnu", {
              ...formData,
              ExtraitNaissance: url1, CNI:url2, DemandeDesInfos: url3, documents: url4, CopieIlot: url5, fredha: url6, plansDeMasse:url7
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
                    <label htmlFor="">Une demande comprenant les informations suivantes:
                    (La commune de bien, Le numéro de la section, Le numéro de l'îlot, La superficie de la parcelle revendiquée)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='DemandeDesInfos' value={DemandeDesInfos} onChange={(e) => setFile3(e.target.files[0])}/>
                    <label htmlFor="">Extrait de naissance</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='ExtraitNaissance' value={ExtraitNaissance} onChange={(e) => setFile1(e.target.files[0])}/>
                    <label htmlFor="">Copie de la pièce d'identité</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='CNI' value={CNI} onChange={(e) => setFile2(e.target.files[0])}/>
                    <label htmlFor="">Une fredha (Lorsque le bien appartenait à une personne décédée)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='fredha' value={fredha} onChange={(e) => setFile6(e.target.files[0])}/>
                    <label htmlFor="">Une copie de la fiche de l'ilot(délivrée par la conservation foncière territorialement compétente)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='CopieIlot' value={CopieIlot} onChange={(e) => setFile5(e.target.files[0])}/>
                    <label htmlFor="">Tout document, admis par la législation en vigueur, au moyen lequel le requérant entend faire valoir droit sur le bien revendiqué</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='documents' value={documents} onChange={(e) => setFile4(e.target.files[0])}/>
                    <label htmlFor="">05 plans de masse et de situation établer par un géomètre expert foncier(veuillez les metter tous dans un seul pdf)</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='plansDeMasse' value={plansDeMasse} onChange={(e) => setFile7(e.target.files[0])}/>
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

export default DeclarationInconu;
