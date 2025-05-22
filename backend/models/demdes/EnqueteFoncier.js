import mongoose from "mongoose";

const EnqueteFoncierSchema = mongoose.Schema({
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
    plansDeMasse:{
        type:[Object],
        required: true,
    },
    rapportExpertise:{
        type: String,
        required: true,
    },
    ExtraitNaissance: {
        type: String,
        required: true,
    },
    ouvertureEnquêteFoncière:{
        type: String,
        required: true,
    },
    DéclarationVente:{
        type: String,
        required: true,
    },
    DéclarationDonation:{
        type: String,
        required: true,
    },
    fredha:{
        type: String,
        required: true,
    },
    procurationNotariale:{
        type: String,
        required: true,
    },
    déclarationHonneur: {
        type: String,
        required: true,
    },
    déclarationDexistence: {
        type: String,
        required: true,
    },
    certificatPossession:{
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

const EnqueteFoncier = mongoose.model("EnqueteFoncier", EnqueteFoncierSchema);
export default EnqueteFoncier;