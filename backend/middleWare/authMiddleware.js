import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(401).send({message: "Vous n'êtes pas autorisé, veuillez vous connecter!", success: false})
            // throw new Error("Not authorized, please login 01")
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // Get user id from tokens
        const user = await User.findById(verified.id).select("-password");
        const admin = verified.isAdmin
        console.log(admin);
        // const Admin = await User.find({id: verified.id, isAdmin: verified.isAdmin},  {isAdmin: true});

        if (!user) {
            return res.status(401).send({message: 'Utilisateur introuvable', success:false});
            // throw new Error("user not found")
        }

         
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send({message: "Vous n'êtes pas autorisé, veuillez vous connecter!", success: false})
        // throw new Error("Not authorized, please login 02");
    }
});


const protectAdmine = async (req, res, next)=>{
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(401).send({message: "Vous n'êtes pas autorisé, veuillez vous connecter!", success: false})
            // throw new Error("Not authorized, please login 01")
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // Get user id from tokens
        const user = await User.findById(verified.id).select("-password");
        const admin = verified.isAdmin
        console.log(admin);
        // const Admin = await User.find({id: verified.id, isAdmin: verified.isAdmin},  {isAdmin: true});

        if (!user) {
            return res.status(401).send({message: 'Utilisateur introuvable', success:false});
            // throw new Error("user not found")
        }
        if (!admin) {
            return res.status(401).send({message: "vous n'ete pas un admin", success:false});
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send({message: "Vous n'êtes pas autorisé, veuillez vous connecter!", success: false})
        // throw new Error("Not authorized, please login 02");
    }
}

// const protectAdmine = async (req, res, next)=>{
//     protect(req, res, next, ()=>{
//         if(req.user.isAdmin){
//             next();
//         }else{
//             return next(createError(403, "you are not authorized!"));
//         }
//     })
// }

export {
    protect,
    protectAdmine
};