import Hours from "../models/Hours.js";
import RendezVous from "../models/RedezVousModel.js";

// creer les heurs par l'administrateur 
const AddHours = async(req, res, next)=>{
    try {
            // const heurs = req.body
        const checkIfHourExiste = await Hours.findOne({heure: req.body.heure});
        if (checkIfHourExiste ) {
            return res.status(400).send({success: false, mesage: 'cette heur existe deja'});
        }
        const heursRDV = await new Hours(req.body);
        const savedHours = await heursRDV.save();
        res.status(200).send({savedHours: savedHours, success:true, message:"Bravo, le crenau et creer avec succes"});
    } catch (error) {
        res.status(500).send({mesage:"une erreur c'est produit veuilez ressayer", success: false});
        next(error);
    }
}

const getDisponibleHours = async (req, res, next) => {
    try {
        const allDisponibleHours = await Hours.find();
        if (!allDisponibleHours.length) {
            return res.status(200).send({ success: true, message: "pas d'heurs disponible" });
        } else {
            const datechoised = { date: req.body.date };
            const getHoursOfThisDate = await RendezVous.distinct('heure', datechoised);
            const allExistedHours = await Hours.distinct('heure', { disponible: true });

            let result = [];
            for (const value of allExistedHours) {
                // Vérifier si la valeur existe dans rendezvousvalue
                if (!getHoursOfThisDate.includes(value)) {
                    result.push(value);
                }
            }

            const hours = await Hours.find(
                { heure: { $in: result } }, // Utilisation de $in pour rechercher plusieurs valeurs,
                { _id: 1, heure: 1, id: 1 }
            );
            
            res.status(200).send({ Hours: hours, success: true });
        }
    } catch (error) {
        res.status(500).send({ mesage: "une erreur c'est produit veuilez ressayer", success: false });
        next(error);
    }
};


// const getDisponibleHours = async(req, res, next)=>{
//     const allDisponibleHours = await Hours.find();
//     if (!allDisponibleHours) {
//         res.status(200).send({success: true, message:"pas d'heurs disponible"});
//     }else{
//         const datechoised = {date:req.body.date};
//         const getHoursOfThisDate = await RendezVous.distinct('heure' ,datechoised);
//         // console.log(getHoursOfThisDate);
//         const allExistedHours = await Hours.distinct('heure', {disponible: true});
//         // console.log(allDisponibleHours);
//         // console.log(allExistedHours);
//         let result = [];
//         for (const value of allExistedHours) {
//             // Vérifier si la valeur existe dans rendezvousvalue
//             if (!getHoursOfThisDate.includes(value)) {
//                 return result.push(value);
//             }
//         }
//         // console.log("result is", result);
//         // res.send(result);
//         const hours = await Hours.find( 
//             { heure: { $in: result } }, // Utilisation de $in pour rechercher plusieurs valeurs, 
//             { _id: 1, heure: 1, id: 1 }
//         );
        
//         // let result = [];
//         // if () {
            
//         // }

//             res.status(hours);
//         // res.status(200).send({ Hours: hours, success: true });
//     }
// }


export {
    AddHours,
    getDisponibleHours
}