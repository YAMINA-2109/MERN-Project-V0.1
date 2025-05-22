import express from 'express';
const router = express.Router();

// import functions frome controllers
import {getAllUsers, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} from '../controllers/userController.js';
import {protect, protectAdmine} from '../middleWare/authMiddleware.js';
import {verifyToken, verifyUser, verifyAdmin} from '../Utils/verifyToken.js';
// const {registerUser} = require('../controllers/userController');
// router.get("/checkAuthentication", verifyToken, (req, res, next)=>{
//     res.send('you are loged in')
// })
// router.get('/chekUser/:id', verifyUser, (req, res, next)=>{
//     res.send('accounted is succesfuly deleted');
// })

// router.get('/chekAdmin/:id', verifyAdmin, (req, res, next)=>{
//     res.send('hello admin akhame dakhmike ayene teveghite khemithe ');
// })
// router.post("/register", registerUser);
// router.post("/login", LoginUser);
// router.get("/logout", Logout);

// router.get("/getUser", protect, getUser);
// router.post("/getUser", protect, getUser);
router.post("/getAllUsers", protectAdmine, getAllUsers);
// router.post("/getAllUsers", getAllUsers);

// router.post("/admin", getAdmin);

router.get("/loggedin", loginStatus);

router.patch("/updateuser",protect, updateUser);

router.patch("/changepassword",protect, changePassword);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);




export default router; 