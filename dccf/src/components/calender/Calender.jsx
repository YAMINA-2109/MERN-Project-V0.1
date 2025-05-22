import {useState, useEffect} from 'react';
// import { es } from 'date-fns/locale';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import {fr} from 'date-fns/locale'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './Calender.css'
import { Button, DatePicker, Space, message, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';




// const activeHours = [
//     {id: 1, heur:'08:00'}, 
//     {id: 2, heur:'08:20'}, 
//     {id: 3, heur:'08:40'}, 
//     {id: 4, heur:'09:10'}, 
//     {id: 5, heur:'09:30'}, 
//     {id: 6, heur:'09:50'}, 
//     {id: 7, heur:'10:10'}, 
//     {id: 8, heur:'10:30'}, 
//     {id: 9, heur:'10:50'}, 
//     {id: 10, heur:'11:10'}
//     ];

function Calender() {
    const [heurClicked, setHeurClicked] = useState(null);
    const [selected, setSelected] = useState(null);
    const [dayClicked, setDayClicked] = useState(false)
    const [value, setValue] = useState(null);
    const [activeHours, setActiveHours] = useState([]);
    const [rendezVousNull, setRendezVousNull] = useState(false);
    const [cookie, setCookie] = useState();
    const [rendezVousChoisie, setRendezVousChoisie] =useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
        }else{
            message.error("Vous ne pouvez pas prendre de rendez-vous ! Vous n'êtes pas authentifié !");
            navigate('/login');
        } 
    }, []); 
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    });
    const cookies = {
        'access_token': cookie
    };
    const onChange = async ( date ,dateString) => {
        setValue(dateString);
        const res = await instance.post('/api/hours/allHours', {            
                date: dateString,
            },{
            headers: {
                Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
            }
        })
        console.log(res.data.Hours);
        if(res.data.Hours == null){
            setRendezVousNull(true);
            message.warning(`${dateString}: Aucun horaire disponible pour cette journée`);
        }
        if(res.data.success){
            setActiveHours(res.data.Hours)
        }else{
            message.error(`Erreur lors du chargement des horaires`);
        }
        setDayClicked(true);
    };
    const handleHeurClick = (event)=>{
        const heureValue = event.target.innerText; // Ou event.target.value, selon votre cas d'utilisation
        console.log('Heure cliquée :', heureValue);
        setHeurClicked(heureValue);

    }
    
    const rendezVousValidation = async()=>{
        if (selected) {
            if(!heurClicked){
                message.error("Choisissez un horaire avant de valider le rendez");
            }
            const response = await instance.post('/api/rendezVous/addRendezVous', {            
                date: value,
                heure: heurClicked
            },{
            headers: {
                Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
            }
            })
        
            console.log(response.data);
            if(response.data.success){
                // message.info(response.data.message);
                message.success(response.data.message);
                setRendezVousChoisie({date: value, heure: heurClicked})
                // navigate('/')
            }else{
                message.error(response.data.message);
            }
        }else{
            message.error("Veuillez choisir d'abord une date");
        }
        
    }
    const ModfierLeRendezVous = ()=>{
        navigate('/rendezVous')
    }
    const disabledDate = current => {
        const currentDate = new Date();
        return current && current < currentDate && !current.isSame(currentDate, 'day');
    };
    return (
        <div className="RdvContainer">
            <h1 className="rdvTitel">
                Rendez-vous
            </h1>
            {
                rendezVousChoisie?(
                    <div className="rdvmessagewraper">
                        <div className="RdvInfo">
                        Filicitaion pour votre rendez-vous vous devez vous presenter a la direction de cadaster : le {rendezVousChoisie.date} a {rendezVousChoisie.heure}
                        </div>
                        <div>
                            <button className="button" onClick={ModfierLeRendezVous}> Imprimer Mon Tecke</button>
                        </div>
                    </div>
                ): (
                    <div className="rdvwraper">
                        <div className="datePckerSection">
                            <div className="dateTitle">Les Dates Disponibles</div>
                            {/* <div className="datePcker"> */}
                            <DatePicker onChange={onChange} onSelect={setSelected} value={selected} locale={fr} disabledDate={disabledDate} className='datePcker'/>
                            {/* </div> */}
                            <div className="dateMessage">vous avez choisie la date: {value} </div>
                        </div>
                        <div className="hourPckerSection">
                            <div className="hourTitle">Heures Disponible</div>
                            <div className="hourPcker">
                            {   
                                value ?(
                                    <Space wrap>
                                        {
                                            activeHours?(
                                                activeHours.map(function(element){
                                                    return <Button type="primary"
                                                            key={element._id} onClick={handleHeurClick} value={element.heure} className='bg-sky-500/100'>{element.heure}</Button>
                                                            })): (message.warning('pas de redezVous disponible pour cette date'))
                                                    }
                                    </Space>
                                ):<p className='hourMessage'>veillez selectione une journee sur le calendarie</p>
                            }
                            </div>
                            <div className="hourbtn">
                                <button className="button" onClick={rendezVousValidation}>Valider le rendez-vous</button>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
        /* <div className="calender">
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="featured">
                    <Row justify="space-around" className='mt-80 space-x-4 '>
                        <div className="container">
                            <div className="left">
                                <Col span={12} className='p-200 mt-5'>
                                <div className="listSearch">
                                    <h1 className="lisTitel">Dates</h1>
                                    <div className="lsItem">
                                            <DatePicker onChange={onChange} onSelect={setSelected} value={selected} locale={fr}/>
                                    </div>
                                </div>
                                </Col>
                            </div>
                            <div className="right">
                                <Col span={12} >
                                <div className="listResult">
                                    <h1 className="lisTitel">Heurs Disponible</h1>
                                            {   
                                                value ?(
                                                        <Space wrap>
                                                            {
                                                            activeHours?(
                                                                activeHours.map(function(element){
                                                                return <Button type="primary"
                                                                key={element._id} onClick={handleHeurClick} value={element.heure} className='bg-sky-500/100'>{element.heure}</Button>
                                                                })): (message.warning('pas de redezVous disponible pour cette date'))
                                                            }
                                                        </Space>
                                                    ):<div>veillez selectione une journee sur le calendarie</div>
                                            }
                                    <div className='prise'>
                                        <button className="button" onClick={rendezVousValidation}>Valider le rendez-vous</button>
                                    </div>
                                </div>
                                </Col>
                            </div>
                        </div>
                    </Row>
                    </div>
                    {/* <Row justify="space-around" className='mt-80 space-x-4 '>
                        <Col span={12} className='p-200 mt-5'>
                            <div className="listSearch">
                                <h1 className="lisTitel">Dates</h1>
                                <div className="lsItem">
                                        <DatePicker onChange={onChange} onSelect={setSelected} value={selected} locale={fr}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={12} >
                            <div className="listResult">
                                <h1 className="lisTitel">Heurs Disponible</h1>
                                        {   
                                            value ?(
                                                    <Space wrap>
                                                        {
                                                        activeHours?(
                                                            activeHours.map(function(element){
                                                            return <Button type="primary"
                                                            key={element._id} onClick={handleHeurClick} value={element.heure} className='bg-sky-500/100'>{element.heure}</Button>
                                                            })): (message.warning('pas de redezVous disponible pour cette date'))
                                                        }
                                                    </Space>
                                                ):<div>veillez selectione une journee sur le calendarie</div>
                                        }
                                <div className='prise'>
                                    <button className="button" onClick={rendezVousValidation}>Valider le rendez-vous</button>
                                </div>
                            </div>
                        </Col>
                    </Row> */
                /* </div> */
            /* // </div> */
        /* // </div> */
        /* </> */
    )
}

export default Calender
