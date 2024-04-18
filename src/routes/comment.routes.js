import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js';
import { getComments, getComment, updateComment, deleteComment, createComment, getCommentsById } from "../controllers/comment.controller.js";

const router = Router();

router.get('/comments', authRequired,getComments);
router.get('/comments/:id', authRequired,getComment);
router.get('/comments/task/:id', authRequired, getCommentsById);
router.post('/comments', authRequired,createComment);
router.delete('/comments/:id', authRequired,deleteComment);
router.put('/comments/:id', authRequired,updateComment);


export default router;