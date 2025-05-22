import RendezVous from '../models/RedezVousModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


// register an appointment 
const registerAppointment = async(req, res, next)=>{
    try {
        // get user ID
        const token = req.cookies.access_token;
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");
        const userId = user.id;
        const clientName = user.name;
        const clientPrenom =user.prénom;
        const clientRdv = user.RDV._id;
        const clientRdvStatus = user.RDV.statut
        console.log(user);
        // Check if user already has an appointment
        if (clientRdv) {
            return res.status(400).send({ success: false, message: "Vous avez déjà un rendez-vous enregistré." });
        }
        // puis verifier si la date et l'heur n'existe pas deja dans la BD: 
            const existedRDV = await RendezVous.findOne({date:req.body.date, heure:req.body.heure})
            if (existedRDV) {
                return res.status(200).send({success: false, message: "Ce Rendez Vous N'est Pas Disponible."})
            }
            // enregistrer le rendez-vous
            const newRendezVous = new RendezVous({client: userId,clientName:clientName, clientPrenom: clientPrenom, date: req.body.date, heure: req.body.heure, disponible: false});
            const savedRendezVous = await newRendezVous.save();
            // ajouter le rendez-vous a la table user pour l'utilisateur specifique 
            user.RDV = savedRendezVous._id;
            await user.save();
            // envoiyer un message de succes a l'utilisateur
            res.status(200).send({message:'Félicitations, votre rendez-vous a été enregistré avec succès ! Nous vous confirmerons dans les plus brefs délais.', success: true });
    } catch (error) {
        return res.status(500).send({message:"Une erreur s'est produite, veuillez réessayer s'il vous plaît.", success: false});
        // next(error);
    }
}
// Dellet an appointment 
const deleteAnappointment = async(req, res, next)=>{
    const id = req.params.id
    try {
        // const deletedRendezVous = 
        await RendezVous.findByIdAndDelete(id)
        res.status(200).json({message: 'le rendez-vous a ete supprimer avec succes'});
        // await deletedRendezVous.save();
    } catch (error) {
        // res.status(500).json(error)
        next(error);
    }
}
// Delete all
const deleteAllappointment = async(req, res, next)=>{
    try {
        await RendezVous.deleteMany({}); // Supprime tous les enregistrements de la collection
        console.log('Tous les rendez-vous ont été supprimés.');
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression des rendez-vous :', error);
      }
}
// update an appointment
const updateApointment = async(req, res, next)=>{
    const id =req.params.id 
    try {
        const updatedRendezVous = await RendezVous.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        // using findByIdAndUpdate methode wille return the previose resulte in this case updatedRendezVous wille return the vlues before changing so to return the new one after the {set} we should add the seconde option of the "findByIdAndUpdate" methode wiche is {new: true}
        res.status(200).json(updatedRendezVous);
    } catch (error) {
        // res.status(500).json(error);
        next(error);
    }
}
// get one appointment
const getOneApointment = async(req, res,next)=>{
    const id =req.params.id 
    try {
        const oneRendezVous = await RendezVous.findById(id);
        res.status(200).json(oneRendezVous);
    } catch (error) {
        next(error);
        // res.status(500).json(err);
    }
}
// get all appointment
const getAllApointment = async(req, res, next)=>{
    
    try {
        const AllRendezVous = await RendezVous.find();
        res.status(200).json(AllRendezVous);
    } catch (error) {
        next(error);
    }
}

// confirmer un rendez-vous
const confirmAppointment = async(req ,res,next)=> {
    try {
        const {_id, client, status} = req.body;
        const updatedRendezVous = await RendezVous.findByIdAndUpdate(_id, { statut: status}, // Nouveau statut que vous souhaitez définir
        { new: true });
        const updatedUserRdz = await User.findByIdAndUpdate(client, { RDV: {RdvId: _id, statut: status} }, // Nouveau statut que vous souhaitez définir
        { new: true });
        return res.status(200).json({success: true, message:"Votre reponse a ete bien envoyer a l'utilisateur, merci!"});

    } catch (error) {
        return res.status(500).json({success: false, message:"erreur"});
    }
}
export {
    registerAppointment,
    getAllApointment,
    getOneApointment,
    deleteAnappointment,
    updateApointment,
    deleteAllappointment,
    confirmAppointment
}