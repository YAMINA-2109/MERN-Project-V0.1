import cloudinary from '../Utils/cloudinary.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// create a post by the admin
const createPost = async(req, res, next)=>{
        const { title, content, postedBy, image, likes, comments } = req.body;
    
        try {
            //upload image in cloudinary
            // const result = await cloudinary.uploader.upload(image, {
            //     folder: "posts",
            //     width: 1200,
            //     crop: "scale"
            // })
            const post = await Post.create({
                title,
                content,
                // postedBy: req.user._id,
                image,
    
            });
            // res.status(201).json({
            //     success: true,
            //     post
            // })
    return res.status(201).send({post, succes: true, message:'Le a ete creer avec succes, Bravo!'});

   } catch (error) {

    console.log(error);
    next(error);
    return res.status(400).send({succes: false, errorMessage:"Une erreur est survenue lors de creation"})
    }
}

// show the post to public
const showPost = async(req, res, next)=>{
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate('postedBy', 'name');
        if(!posts){
            return res.status(404).send({success:false, message:"Aucun article trouvé!"})
        }
        return res.status(200).send({posts, success:true, message:"Les articles ont été récupérés"});
    } catch (error) {
        console.log(error);
        next(error);
        return res.status(400).send({succes: false, message:"Une erreur est survenue"});
        }
}

// show single post 
const showOnePost = async(req, res, next)=>{
    try {
        const post = await Post.findById(req.params.id).populate('comments.postedBy', 'name');
        if(!post){
            return res.status(404).send({success:false, message:"Aucun article trouvé!"})
        }
        return res.status(200).send({post, success:true, message:"Les articles ont été récupérés"});
    } catch (error) {
        console.log(error);
        next(error);
        return res.status(400).send({succes: false, message:"Une erreur est survenue"});
        }
}

// delete single post 
const deletePost = async(req, res, next)=>{
    const currentPost = await Post.findById(req.params.id);
    // delete post image in cloudinary
    const imgId = currentPost.image.public_id;
    if (imgId) {
        await cloudinary.v2.uploader.detroy(imgId);
    }
    try {
        const deletedPost = await Post.findByIdAndRemove(req.params.id)

        return res.status(200).send({ success:true, message:"L'articles a été suprimer avec succes"});
    } catch (error) {
        console.log(error);
        next(error);
        return res.status(400).send({succes: false, message:"Une erreur est survenue"});
        }
}

// update single post 
const updatePost = async(req, res, next)=>{
    try {
        const {title, content, image} = req.body;
        const currentPost = await Post.findById(req.params.id);

        // build the object data
        const data = {
            title: title || currentPost.title,
            content: content || currentPost.content,
            image: image || currentPost.image,
        }
        // modify post image conditionally
        if (req.body.image !== '') {
            const imgId = currentPost.image.public_id;
            if (imgId) {
                await cloudinary.v2.uploader.destroy(imgId);
            }
            const newImage = await cloudinary.v2.uploader.upload( req.body.image,{
                folder: "posts",
                width: 1200,
                crop: "scale"
        
            });
            data.image ={
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
        }
        // update post with modified data
        const postUpdated = await Post.findByIdAndUpdate(req.params.id, data, {new: true});
        return res.status(200).send({
            postUpdated,
            success:true, message:"L'articles a été suprimer avec succes"});

    } catch (error) {
        console.log(error);
        next(error);
        return res.status(400).send({succes: false, message:"Une erreur est survenue"});
        }
}

// add comment
const addComment = async(req, res, next)=>{
    const {comment} = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $push:{comments:{text: comment, postedBy: req.user._id}}
        },
        {new: true}
        )
        return res.status(200).json({
            post,
            succes: true,
            message:"merci pour votre commentaire"
        })
    } catch (error) {
        next(error)
    }
}

// add like
const addLike = async(req, res, next)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: {likes: req.user._id}
        },{new: true}
        );
        return res.status(200).json({
            post,
            succes: true,
            message:"merci pour votre like"
        })
    } catch (error) {
        next(error)
    }
}


// remove like
const removeLike = async(req, res, next)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: {likes: req.user._id}
        },{new: true}
        );
        return res.status(200).json({
            post,
            succes: true,
            message:"merci pour votre like"
        })
    } catch (error) {
        next(error)
    }
}


export {
    createPost,
    showPost,
    showOnePost,
    deletePost,
    updatePost,
    addComment,
    addLike,
    removeLike
}