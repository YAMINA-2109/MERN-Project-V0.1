import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Veuillez ajouter un nom"]
    },
    prénom: {
        type: String,
        required:[true, "Veuillez ajouter un prenom"]
    },
    email:{
        type: String,
        required:[true, "Veuillez ajouter une adresse e-mail."],
        unique: true,
        trim: true, //to remove any spaces
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            "Veuillez saisir une adresse e-mail valide."
        ]
    },
    password:{
        type: String,
        required: [true, "Veuillez ajouter un mot de passe."],
        minLength:[6, "Le mot de passe doit comporter au moins 6 caractères."],
        // maxLength:[23, "Password must not be more to 23 characters"],
    },
    photo:{
        type: String,
        // required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDK1/avatar.png"
    },
    pays: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        default: "+213"
    },
    bio:{
        type: String,
        maxLength:[250, "La biographie ne doit pas dépasser 250 caractères."],
        default: "bio"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAgent: {
        type: Boolean,
        default: false,
    },
    RDV: [
        {
            RdvId:{
                type: String,
            },
            statut: {
                type: String,
                default: 'en attent'
            },
        }
    ],
    demandes: [
        {
            demandeId:{
                type: String,
            },
            typeDemande:{
                type: String,
            },
            demandeResponse:{
                type: String,
                default: null
            },
            statut: {
                type: String,
                default: 'en attent'
            },
            dateCreationDemande:{
                type: Date
            }
        }
        
    ]
},
    {
        timestamps: true, //this is going to add by defaulte and automaticly to proprties to this model "createdAt" and "updatedAt"
    }
);
// Encrypt password befor saving it to the DB the methode 02 (best methode becouse withe doing thise we wille note need to encript the password in many foleders like we when the user forgote the passeword..etc we wille do it her for one time)
userSchema.pre("save", async function(next){
    // now if the user hase been changed auther information but not password so we don't need to encrypte the passeword againe so we choulde check that and to do so here is how:
    if(!this.isModified("password")){
        return next();
    }  

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User", userSchema);
export default User;