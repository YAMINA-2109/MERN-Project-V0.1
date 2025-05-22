import express from "express";
const router = express.Router();
import {protect, protectAdmine} from '../middleWare/authMiddleware.js';
import { addComment, addLike, createPost, deletePost, removeLike, showOnePost, showPost, updatePost } from "../controllers/postControllers.js";

router.post('/addPost',createPost);
router.get('/showPosts', showPost);
router.get('/showPost/:id', showOnePost);
router.delete('/deletePost/:id', protectAdmine ,deletePost);
router.put('/updatePost/:id', protectAdmine ,updatePost);
router.put('/comment/:id', protect,addComment);
router.put('/addlike/:id', protect, addLike);
router.put('/removelike/:id', protect, removeLike);


export default router ;
