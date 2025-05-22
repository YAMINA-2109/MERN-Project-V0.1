import { response } from "express";
import DeclarationInconnu from "../models/demdes/DeclarationInconnu.js";
import DeclarationZnc from "../models/demdes/DeclarationZnc.js";
import DemandeAttCadstrale from "../models/demdes/DemandeAttCadastrale.js";
import DemandeLivretFoncier from "../models/demdes/DemandeLivretFoncier.js";
import EnqueteFoncier from "../models/demdes/EnqueteFoncier.js";
import User from "../models/userModel.js";
import req from "express/lib/request.js";

// registeruSerDemande attestation cadastralle demande "user post demande"
const RegisterDemande = async (req, res, next)=>{
    const {name ,prénom , age, manuscrite, planSituation, quittance} = req.body;
    try {
        const userId = req.user._id
    if(!name||!prénom ||!age ||!manuscrite ||!planSituation ||!quittance){
        return res.status(400).json({success: false, message:"Tous les champs doivent etre remplis!!!"})
    }
    if (!userId)  throw new Error("User not found");
    
    const savedDemande = await DemandeAttCadstrale.create({clientId:userId, name ,prénom , age, manuscrite, planSituation, quittance, typeDemande: "attestation_cadastrale"
    })
    console.log(savedDemande);

    // const dateDemande = savedDemande.
    // createdAt
    // const date = new Date(dateDemande);
    // // Obtenez les composantes de la date (jour, mois, année)
    // const jour = date.getDate();
    // const mois = date.getMonth() + 1; // Notez que les mois commencent à partir de 0
    // const annee = date.getFullYear();

    // // Formatez la date en 'dd-mm-yyyy'
    // const dateFormatee = `${jour.toString().padStart(2, '0')}-${mois.toString().padStart(2, '0')}-${annee}`;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            demandes: {
              demandeId: savedDemande._id, // ID de la demande créée
              typeDemande: "attestation_cadastrale", // Type de demande (vous pouvez personnaliser cela)
                // dateCreationDemande: dateFormatee,
            
            },
          },
        },
        { new: true }
      );
        return res.status(200).json({success: true, savedDemande , message:"Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}


// registeruSerDemande demande livret foncier "user post demande"
const RegisterLivretDemande = async (req, res, next)=>{
    const {name ,prénom , age, ExtraitNaissance, CNI, quittance, ProcurationNotariale, fredha} = req.body;
    try {
        const userId = req.user._id
    if(!name||!prénom ||!age ||!ExtraitNaissance ||!CNI ||!quittance ||!ProcurationNotariale ||!fredha){
        return res.status(400).json({success: false, message:"Tous les champs doivent etre remplis!!!"})
    }

    const savedlivret = await DemandeLivretFoncier.create({clientId: userId, name ,prénom , age, ExtraitNaissance, CNI, quittance, ProcurationNotariale, fredha, typeDemande: "Livret_Foncier"
    })

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            demandes: {
              demandeId: savedlivret._id, // ID de la demande créée
              typeDemande: "Livret_Foncier", // Type de demande (vous pouvez personnaliser cela)
                // dateCreationDemande: dateFormatee,
            
            },
          },
        },
        { new: true }
      );
    return res.status(200).json({success : true, message :"Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !", savedlivret});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// registeruSerDemande demande Inconnu "user post demande"
const RegisterInconnuDemande = async (req, res, next)=>{
    const {name, prénom, age, ExtraitNaissance, CNI, DemandeDesInfos,  documents, CopieIlot, fredha, plansDeMasse} = req.body;
    try {
        const userId = req.user._id

    if(!name ||!prénom ||!age ||!ExtraitNaissance ||!CNI ||!DemandeDesInfos || !documents || !CopieIlot || !fredha ||!plansDeMasse){
        return res.status(400).json({success: false, message:"Tous les champs doivent etre remplis!!!"})
    }
    const inconnuDemande = await DeclarationInconnu.create({clientId: userId ,name, prénom, age, ExtraitNaissance, CNI, DemandeDesInfos, documents, CopieIlot, fredha, plansDeMasse, typeDemande: "inconnuDemande"});

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            demandes: {
              demandeId: inconnuDemande._id, // ID de la demande créée
              typeDemande: "inconnuDemande", // Type de demande (vous pouvez personnaliser cela)
                // dateCreationDemande: dateFormatee,
            
            },
          },
        },
        { new: true }
      );

    return res.status(200).json({success: true, inconnuDemande , message:"Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// registeruSerDemande demande Enquet Foncier "user post demande"
const RegisterEnquetDemande = async (req, res, next)=>{
    const {name, prénom, age, plansDeMasse, rapportExpertise, ExtraitNaissance, ouvertureEnquêteFoncière, DéclarationVente, DéclarationDonation, fredha, procurationNotariale, déclarationHonneur, déclarationDexistence, certificatPossession}  = req.body;
    try {
        const userId = req.user._id
    if(!name || !prénom || !age || !plansDeMasse || !rapportExpertise || !ExtraitNaissance || !ouvertureEnquêteFoncière || !DéclarationVente || !DéclarationDonation || !fredha || !procurationNotariale || !déclarationHonneur || !déclarationDexistence || !certificatPossession){
        return res.status(400).json({success: false, message:"Tous les champs doivent etre remplis!!!"})
    }
    const EnqueteDemande = await EnqueteFoncier.create({clientId: userId, name, prénom, age, plansDeMasse, rapportExpertise, ExtraitNaissance, ouvertureEnquêteFoncière, DéclarationVente, DéclarationDonation, fredha, procurationNotariale, déclarationHonneur, déclarationDexistence, certificatPossession, typeDemande: "EnqueteDemande",
    })
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            demandes: {
              demandeId: EnqueteDemande._id, // ID de la demande créée
              typeDemande: "EnqueteDemande", // Type de demande (vous pouvez personnaliser cela)
                // dateCreationDemande: dateFormatee,
            
            },
          },
        },
        { new: true }
      );


    return res.status(200).json({success: true, EnqueteDemande , message:"Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// registeruSerDemande demande ZNC "user post demande"
const RegisterZncDemande = async (req, res, next)=>{
    const {name, prénom, age, ExtraitNaissance, CNI, DemandeDesInfos, documents, fredha, plansDeMasse}= req.body;
    try {
        const userId = req.user._id
    if(!name||!prénom ||!age ||!ExtraitNaissance ||!CNI ||!DemandeDesInfos || !documents || !fredha ||!plansDeMasse){
        return res.status(400).json({success: false, message:"Tous les champs doivent etre remplis!!!"})
    }
    const ZncDemande = await DeclarationZnc.create({
        clientId: userId, name, prénom, age, ExtraitNaissance, CNI, DemandeDesInfos, documents, fredha, plansDeMasse
    })

    return res.status(200).json({success: true, ZncDemande, message:"Votre demande a été enregistrée. Vous allez recevoir une réponse dans les plus brefs délais !"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// get one demande "user, agent, admin for statistiques"
const GetAllAttCadastralDemande = async (req, res, next)=>{
    try {
        const attCadastrales = await DemandeAttCadstrale.find();
        if(attCadastrales){
            return res.status(200).json({success: true, message:"Toutes les Demandes d'attestations cadastrale sont charger!", attCadastrales});
        }else{
            return res.status(200).json({success: true, message:"Auccune demande n'est enregistrer pour le moment!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// livret foncier
const GetAllLivretFoncierDemande = async (req, res, next)=>{
    try {
        const livretFonciers = await DemandeLivretFoncier.find();
        if(livretFonciers){
            return res.status(200).json({success: true, message:"Toutes les Demandes sont charger!", livretFonciers});
        }else{
            return res.status(200).json({success: true, message:"Auccune demande n'est enregistrer pour le moment!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// ZNC
const GetZncDemande = async (req, res, next)=>{
    try {
        const zncs = await DeclarationZnc.find();
        if(zncs){
            return res.status(200).json({success: true, message:"Toutes les Demandes sont charger!", zncs});
        }else{
            return res.status(200).json({success: true, message:"Auccune demande n'est enregistrer pour le moment!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// Enquete Foncier
const GetEnqueteDemande = async (req, res, next)=>{
    try {
        const enquetFoncieres = await EnqueteFoncier.find();
        if(enquetFoncieres ){
            return res.status(200).json({success: true, message:"Toutes les Demandes sont charger!", enquetFoncieres });
        }else{
            return res.status(200).json({success: true, message:"Auccune demande n'est enregistrer pour le moment!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

// Inconnu 
const GetInconnuDemande = async (req, res, next)=>{
    try {
        const Inconnus = await DeclarationInconnu.find();
        if(Inconnus ){
            return res.status(200).json({success: true, message:"Toutes les Demandes sont charger!", Inconnus });
        }else{
            return res.status(200).json({success: true, message:"Auccune demande n'est enregistrer pour le moment!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:error})
    }
}

const demandeAccepted = async (req, res, next)=>{
    try {
        const {reponses,  clientId, demandeId} = req.body;
        const updatedDemande = await DemandeAttCadstrale.findByIdAndUpdate(demandeId, { statutDemd: 'confirmer', reponse: reponses }, // Nouveau statut que vous souhaitez définir
        { new: true });
        const updatedUserDemande = await User.findByIdAndUpdate(clientId, { demandes: {demandeResponse: reponses, statut: 'confirmer'} }, // Nouveau statut que vous souhaitez définir
        { new: true });
        return res.status(200).json({success: true, message:"Votre reponse a ete bien envoyer a l'utilisateur, merci!"});
        // User.findByIdAndUpdate(clientId,{ $push:{demandes: reponse}})
    } catch (error) {
        return res.status(500).json({success: false, message:"votre reponse n'a pas pu etre enregistrer vouillez resayer dans un instant svp!"})
    }

}
const demandeRefused = async (req, res, next)=>{
    try {
        const {reponses,  clientId, demandeId} = req.body;
        const updatedDemande = await DemandeAttCadstrale.findByIdAndUpdate(demandeId, { statutDemd: 'Refuser', reponse: reponses }, // Nouveau statut que vous souhaitez définir
        { new: true });
        const updatedUserDemande = await User.findByIdAndUpdate(clientId, { demandes: {demandeId:demandeId, demandeResponse: reponses, statut: 'Refuser'} }, // Nouveau statut que vous souhaitez définir
        { new: true });
        return res.status(200).json({success: true, message:"Votre reponse a ete bien envoyer a l'utilisateur, merci!"});
        // User.findByIdAndUpdate(clientId,{ $push:{demandes: reponse}})
    } catch (error) {
        return res.status(500).json({success: false, message:"votre reponse n'a pas pu etre enregistrer vouillez resayer dans un instant svp!"})
    }
}
const livretAccepted = async(req, res, next)=>{
    try {
        const {reponses,  clientId, demandeId} = req.body;
        const updatedDemande = await DemandeAttCadstrale.findByIdAndUpdate(demandeId, { statutDemd: 'confirmer', reponse: reponses }, // Nouveau statut que vous souhaitez définir
        { new: true });
        const updatedUserDemande = await User.findByIdAndUpdate(clientId, { demandes: {demandeResponse: reponses, statut: 'confirmer'} }, // Nouveau statut que vous souhaitez définir
        { new: true });
        return res.status(200).json({success: true, message:"Votre reponse a ete bien envoyer a l'utilisateur, merci!"});
        // User.findByIdAndUpdate(clientId,{ $push:{demandes: reponse}})
    } catch (error) {
        return res.status(500).json({success: false, message:"votre reponse n'a pas pu etre enregistrer vouillez resayer dans un instant svp!"})
    }
}
const livretRefused = async(req, res, next)=>{

}

const getAllClientsDemande = async(req, res, next)=>{
    try {
        // recuprere l'id de l'utilisateur
        const userId = req.user._id; 
        // trouver l'utilisateur et verifier sont existance dans la BD
        if(!userId){
            return res.status(404).json({succes: false, message:"vous devrez etre authentifier pour acceder a cette section"});
        }
        // si l'utilisateur existe recuprer toutes les ID des demandes qu'ils a effectuer
        const demandes = await User.findById(userId)
        const listDemandes = demandes.demandes;
        res.status(200).json({listDemandes, succes: true, message:"Bienvenu!! vous pouvez suivre l'etat d'avancement de vos demandes ici, toutes les demandes que vous avez effectuer sont afficher ici!!"})
        console.log(demandes.demandes);
        // const toutesDemande =[]
        //     for (let i=0 ;i<demandes.length;i++){
        //         return toutesDemande.push(demandes.demandeId);
        //     }
        // si l'utilisateur existe recuprer l'Id des demandes enregistrer dans ca tables toutes demande
    } catch (error) {
        
    }
} 
// get All demandes "agents pours les traiter, et admine pour statistique",
// delete une demande "agent pour l'achever ou la supprimer totalement",
// update une demande "user en cas d'erreur",

export {
    RegisterDemande,
    RegisterEnquetDemande,
    RegisterLivretDemande,
    RegisterInconnuDemande,
    RegisterZncDemande,
    GetAllAttCadastralDemande,
    GetAllLivretFoncierDemande,
    GetZncDemande,
    GetEnqueteDemande,
    GetInconnuDemande,
    demandeAccepted,
    demandeRefused,
    getAllClientsDemande,
    livretAccepted,
    livretRefused,
}