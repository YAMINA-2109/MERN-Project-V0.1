import express from "express";
const router = express.Router();
// import functions
import {
    registerAppointment,
    getAllApointment,
    getOneApointment,
    deleteAnappointment, 
    updateApointment,
    deleteAllappointment,
    confirmAppointment} from '../controllers/rendezVousControler.js'
import {protect} from "../middleWare/authMiddleware.js";
// router.post('/getHours', protect , getHours);
router.post('/addRendezVous', protect , registerAppointment);
router.get('/rendezVous', getAllApointment);
router.delete("/delete/:id", deleteAnappointment) ;  //supprimer un rendez-
router.delete("/delete", deleteAllappointment) ;  //supprimer un rendez-
router.put("/update/:id" ,   updateApointment )    ;     //modifier
router.get("/rendezVous/:id", protect ,getOneApointment);
router.post("/rdvrepons", confirmAppointment);


export default router;