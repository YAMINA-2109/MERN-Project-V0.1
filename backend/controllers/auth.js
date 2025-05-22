import asyncHandler from 'express-async-handler';
import User  from '../models/userModel.js';
import bcrypt  from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import Token  from '../models/tokenModel.js';
// import {verifyToken, verifyUser, verifyAdmin} from '../Utils/verifyToken.js'
// import crypto  from "crypto";
// import sendEmial  from '../Utils/sendEmail.js';
// Register User
const registerUser = asyncHandler(async(req, res)=>{
   const { password, name, prénom, email, pays, phone, photo, bio} = req.body;
   //validation
   if(!name || !email || !password){
        return res.status(400).send({success: false, message: 'Veuillez remplir tous les champs obligatoires'})
        // throw new Error("Please fill in all required fields");
   }

   if(password.length < 6){
    return res.status(400).send({success: false, message: 'Le mot de passe doit comporter au moins 6 caractères.'})
    // throw new Error("Password must be up to 6 characters");
   }
   //check if user email already exists
   const userExists = await User.findOne({email});
   if (userExists) {
        return res.status(404).send({success: false, message: "L'adresse e-mail est déjà enregistrée."})
        // throw new Error("Email has already been registerd");
    }

    //Encrypt password befor saving it to DB
     // methode 01
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)
    

    // if the email is not already existe so cerate new user
    const user = await User.create({
        name,
        prénom,
        email,
        password,
        prénom, 
        pays, 
        phone, 
        photo, 
        bio,
        // password: hashedPassword (for methode1 encrypting)
    })

    // Generate Token
    // const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1d"});// generateToken(user._id);

    // // send HTTP-only cookie
    // res.cookie('access_token', token, {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 1000 * 86400), //1 day
    //     // sameSite: "none",
    //     secure: process.env.NODE_ENV === "development",
    // });
    
    if (user) {
        const {_id, name, prénom, email, pays, phone, photo, bio, RDV} = user
        // res.status(201).json({
        //     _id, name, prénom, email, pays, phone, photo, bio        
        // })
        res.status(201).send({success: true});
    }else{
        return res.status(400).send({success: false, message:"Données utilisateur invalides"})
        // throw new Error("invalide user data");
        // res.send({success: false, message: })
    }

});

// Login User
const LoginUser = asyncHandler(async(req, res) => {
    // res.send("Login user");
    const {email, password} = req.body;

    // validate Request check if not ampty 
    if(!email ||!password){
        res.status(400).send({message:'Veuillez ajouter une adresse e-mail et un mot de passe.', success: false});
        // throw new Error("Please add email and password");
    }
    // check if user exists
    const user = await User.findOne({email})
    if(!user){
        res.status(400).send({message:'Utilisateur introuvable, veuillez vous inscrire', success:false});
        // throw new Error("user not found, please signup")
    }

    // user existe, check the password if it's correct

    const passwordIsCorrect = await bcrypt.compare(password, user.password)
        // Generate Token
        // const token = generateToken(user._id);
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1d"});

        // send HTTP-only cookie
        res.cookie("access_token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), //1 day
            // sameSite: "none",
            secure: process.env.NODE_ENV === "development",
        });
    if(user && passwordIsCorrect){
        const {_id, name, prénom, email, pays, phone, photo, bio, isAdmin, isAgent, RDV} = user
        // res.json({_id, name, prénom, email, pays, phone, photo, bio, token})
        res.status(200).send({currentUser: {_id, name, prénom, email, pays, phone, photo, bio, isAdmin, isAgent, RDV, token}, message: 'Vous êtes connecté avec succès.', success: true})
    }else{
        return res.status(400).send({message:'Adresse e-mail ou mot de passe invalide.', success:false});
        // throw new Error("Invalid email or password")
    }


})

// Logout User
const Logout = asyncHandler(async (req,res)=>{
    res.cookie("access_token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // we expier the token
        // sameSite: "none",
        secure: process.env.NODE_ENV === "development",
    });
    return res.status(200).json({message: "Seccessfuly logged out"})
})
// getUsers
//Get User Data
const getUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        const {_id, name, email, phone, photo, bio, RDV} = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            bio,
            phone,
            RDV
        })
    }else{
        return res.status(400).send({message: 'Utilisateur introuvable', success:false});
        // throw new Error("User not found")
    }
});



export {
    registerUser,
    LoginUser,
    Logout,
    getUser
}