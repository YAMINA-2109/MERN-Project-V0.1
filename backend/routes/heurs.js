import express  from "express";
import {AddHours, getDisponibleHours} from "../controllers/heurs.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
import {protect} from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post('/addHours', verifyAdmin ,AddHours);
router.post('/allHours', protect ,getDisponibleHours);


export default router;