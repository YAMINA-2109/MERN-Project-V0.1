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
    name: "",
    prénom: "",
    age:"",
    manuscrite:"",
    planSituation: "",
    quittance: "",
  };

const AttestationCadastrale = () => {
    const [formData, setFormData] = useState(initialState);
    const { name ,prénom , age, manuscrite, planSituation, quittance} = formData;
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
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
            const res = await newDemandeRequest.post("/api/demandes/registreDemande", {
              ...formData,
              manuscrite: url1, planSituation: url2, quittance: url3,
            },{
                headers: {
                    Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
                }
            });
            dispatch(hideLoading());
            console.log(res);
            if (res.data.success) {
                navigate('/mesDemandes');
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
                    <label htmlFor="">Ajouter la demande manuscrite</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='manuscrite' value={manuscrite} onChange={(e) => setFile1(e.target.files[0])}/>
                    <label htmlFor="">Ajouter le plan de situation avec Google Earth</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='planSituation' value={planSituation} onChange={(e) => setFile2(e.target.files[0])}/>
                    <label htmlFor="">Ajouter la quittance de paiement des frais de la prestation</label>
                    <input type="file" accept=".pdf,.doc,.jpeg,.jpg,.png" name='quittance' value={quittance} onChange={(e) => setFile3(e.target.files[0])}/>
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

export default AttestationCadastrale
{/* <div className="right">
                    <label htmlFor="">service tiltle</label>
                    <input type="text" />
                    <label htmlFor="">short description</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <label htmlFor="">service tiltle</label>
                    <input type="number" min={1}/>
                    <label htmlFor="">service tiltle</label>
                    <input type="number" min={1}/>
                    <label htmlFor="">service tiltle</label>
                    <input type="text" />
                    <label htmlFor="">service tiltle</label>
                    <input type="number" />
</div> */}
{/* <label htmlFor="">category</label>
                    <select name="cats" id="cats">
                        <option value="design">design</option>
                        <option value="webDev">web dev</option>
                        <option value="Animation">Animation</option>
                        <option value="music">music</option>
</select> */}
 {/* <label htmlFor="">Description</label>
                    <textarea name="" id="" cols="30" rows="16" placeholder='your description'></textarea> 
*/}