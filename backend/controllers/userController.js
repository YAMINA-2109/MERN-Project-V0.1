import asyncHandler from 'express-async-handler';
import User  from '../models/userModel.js';
import bcrypt  from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import Token  from '../models/tokenModel.js';
import crypto  from "crypto";
import sendEmial  from '../Utils/sendEmail.js';


// //Get User Data
const getAllUsers = asyncHandler(async(req, res)=>{
    const user = await User.find();
    if (user) {
        // const {_id, name, email, phone, photo, bio, isAgent, isAdmin} = user
        res.status(200).send({users: user ,success:true});
    }else{
        return res.status(400).send({message: 'Utilisateur introuvable', success:false});
        // throw new Error("User not found")
    }
});

// Get login status
const loginStatus = asyncHandler(async(req, res)=>{
    const token = req.cookies.access_token;

    if(!token){
        return res.json(false);
    }

    // verify token 
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if(verified){
        return res.json(true);
    }
    return res.json(false);

})

// update user informations
const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if (user){
        const { name, email, phone, photo, bio} = user;
        user.name = req.body.name || name;
        user.email = email;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            phone: updatedUser.phone, 
            photo: updatedUser.photo, 
            bio: updatedUser.bio
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
    
})

// update user Password
const changePassword = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    // check for the user
    if (!user) {
        res.status(400)
        throw new Error("User not found, please sign up");
    }

    const {oldPassword, password} = req.body;
    // validate
    if (!oldPassword || !password) {
        res.status(400)
        throw new Error("Please add old and new password");
    }

    // check if the old password that the user entre matches the password in the DB;

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // save the new password
    if(user && passwordIsCorrect){
        user.password = password;
        await user.save();
        res.status(200).send("password changed sucesssuly");
    }else{
        res.status(400)
        throw new Error("old password is incorrect");
    }
})
// reset the password
const forgotPassword = asyncHandler(async(req, res)=>{
    const {email} = req.body
    // check if the email existe in the DB
    const user = await User.findOne({email});
    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }
    // Delete token if it exists in DB
    let token = await Token.findOne({userId:user._id});
    if (token) {
        await token.deleteOne();
    };

    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    // Hash Token Before Saving It To The DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save Token To DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) //Thirty minutes
    }).save();

    // Construct Reste URL 
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
        <h2> Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30 minutes.</p>

        <a href=${resetUrl} clicktracking = off>${resetUrl}</a>

        <p>Regards...</p>
        <p>Pinvent Team</p>
    `;
    const subject = "Password Reset Request";
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER
    try {
        await sendEmial(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "Reset Email Sent"});
    } catch (error) {
        res.status(500)
        console.log(error);
        throw new Error("Email not sent, please try again");
    }
})

// Reset Password
const resetPassword = asyncHandler(async(req, res)=>{
    const {password} = req.body;
    const {resetToken} = req.params;

    // Hash Token, Then Compare To Token In The DB
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    // Find Token In DB
    const userToken = await Token.findOne({token: hashedToken, expiresAt:{$gt: Date.now()}})
    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token")
    }
    // Find user
    const user = await User.findOne({_id: userToken.userId})
    user.password = password;

    await user.save();
    res.status(200).json({
        message:"Password Reset Successful, Please Login"
    });
})


export {
    // registerUser,
    // LoginUser,
    // Logout,
    getAllUsers,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
};


//************************code de plus:********************************
// create a function that will genirate tokens
    // const generateToken = (id) => {
    //     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    // }; 

// we can use asyncHandler package insted of using try catch at almost evry time
// const registerUser =asyncHandler( async(req, res)=>{
//     const {name, email, password} = req.body

//     // Validation
//     if(!name || !email || !password){
//         res.status(400);
//         throw new Error("Please fill in all required fields");
//     }
//     if (password.length < 6) {
//         res.status(400)
//         throw new Error("Password must be up to 6 characters");
//     }

//     // check if use email already exists
//     const userExists = await User.findOne({email})
//     if (userExists) {
//         res.status(400)
//         throw new Error("Email has already been registred");
//     }
//     // Encrypt the password before saving it to the DB
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt);
//     // Create new user
//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword
//     })

//     if (user) {
//         const {_id, name, email, photo, phone, bio} = user
//         res.status(201).json({
//             _id, name, email, photo, phone, bio
//             // this is another solution to grape all the infos of an created user
//             /*
//             _id: user.id,
//             name: user.name,
//             email: user.email,
//             photo:user.photo,
//             phone: user.phone,
//             bio: user.bio
//             */
//         })
//     }else{
//         res.status(400);
//         throw new Error("Invalid data")
//     }
// });
// *****************************************************************************