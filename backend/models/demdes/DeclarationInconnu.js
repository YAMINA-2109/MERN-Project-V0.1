import mongoose from "mongoose";

const DeclarationInconnuSchema = mongoose.Schema({
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
    DemandeDesInfos:{
        type: String,
        required: true,
    },
    ExtraitNaissance: {
        type: String,
        required: true,
    },
    CNI: {
        type: String,
        required: true,
    },
    documents: {
        type: String,
        required: true,
    },
    CopieIlot:{
        type: String,
        required: true,
    },
    fredha:{
        type: String,
        required: true,
    },
    plansDeMasse:{
        type:[Object],
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

const DeclarationInconnu = mongoose.model("DeclarationInconnu", DeclarationInconnuSchema);
export default DeclarationInconnu;