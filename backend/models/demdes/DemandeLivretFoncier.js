import mongoose from "mongoose";

const DemandeLivretFoncierSchema = mongoose.Schema({
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
    ExtraitNaissance: {
        type: String,
        required: true,
    },
    CNI: {
        type: String,
        required: true,
    },
    quittance: {
        type: String,
        required: true,
    },
    ProcurationNotariale:{
        type: String,
        required: true,
    },
    fredha:{
        type: String,
        required: true,
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

const DemandeLivretFoncier = mongoose.model("DemandeLivretFoncier", DemandeLivretFoncierSchema);
export default DemandeLivretFoncier;