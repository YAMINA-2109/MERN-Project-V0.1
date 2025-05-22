import express  from "express";
const router =  express.Router();
import { GetAllAttCadastralDemande, GetAllLivretFoncierDemande, GetEnqueteDemande, GetInconnuDemande, GetZncDemande, RegisterDemande, RegisterEnquetDemande, RegisterInconnuDemande, RegisterLivretDemande, RegisterZncDemande, demandeAccepted, demandeRefused, getAllClientsDemande } from "../../controllers/demandes.js";
import { protect } from "../../middleWare/authMiddleware.js";

router.post('/registreDemande', protect, RegisterDemande);
router.post('/registreLivret', protect, RegisterLivretDemande);
router.post('/registreInconnu', protect, RegisterInconnuDemande);
router.post('/registreZnc', protect, RegisterZncDemande);
router.post('/registreEnquetFncr', protect, RegisterEnquetDemande);

router.post('/attCadastraleDemande', protect, GetAllAttCadastralDemande);
router.post('/Livrets', protect, GetAllLivretFoncierDemande);
router.post('/Inconnus', protect, GetInconnuDemande);
router.post('/Zncs', protect, GetZncDemande);
router.post('/EnquetFncrs', protect, GetEnqueteDemande);
router.post('/response', demandeAccepted);
router.post('/response/refused', demandeRefused);
router.post('/Livretresponse', demandeAccepted);
router.post('/response/refusedLivret', demandeRefused);
router.post('/mesDemandes', protect, getAllClientsDemande);


export default router;