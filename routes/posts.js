import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

import {
  createPost,
  getPosts,
  likePost,
  getPost,
} from "../controllers/posts.js";

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);

router.patch("/:id/likePost", likePost);

export default router;
