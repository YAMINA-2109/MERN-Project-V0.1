import mongoose from "mongoose";

const RendezVousSchema = mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    clientName:{
        type :String ,
        required: true
    },
    clientPrenom:{
        type :String ,
        required: true
    },
    date: { 
        type: String, 
        required: true 
    },
    heure: { 
        type: String,
        required: true
    },
    disponible: { 
        type: Boolean, 
        default: true 
    },
    statut: {
        type: String,
        // enum: ['confirmé', 'annulé', 'en atante'],
        default: 'en atante'
    },
    
});

const RendezVous = mongoose.model("RendezVous", RendezVousSchema);
export default RendezVous;