import mongoose from "mongoose";

const DemandeAttCadstraleSchema = mongoose.Schema({
    clientId: {
        type: String,
        // required: true
    },
    name:{
        type :String ,
        required: true
    },
    prénom:{
        type :String ,
        required: true
    },
    age:{
        type :String ,
        required: true
    },
    manuscrite: {
        type: String,
    },
    planSituation: {
        type: String,
    },
    quittance: {
        type: String,
    },
    reponse:{
        type: String,
        default: null
    },
    statutDemd: {
        type: String,
        // enum: ['Traiter', '', 'en atante'],
        default: 'en atante'
    },
    typeDemande:{
        type: String,
        default: null
    }
    
},
{
    timestamps: true, //this is going to add by defaulte and automaticly to proprties to this model "createdAt" and "updatedAt"
}
);

const DemandeAttCadstrale = mongoose.model("DemandeAttCadstrale", DemandeAttCadstraleSchema);
export default DemandeAttCadstrale;