import express from "express";
import {registerUser, LoginUser, Logout, getUser} from '../controllers/auth.js';
// import {verifyUser} from '../Utils/verifyToken.js'
import { protect } from "../middleWare/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/logout", Logout);
router.post("/getUser", protect, getUser);

export default router