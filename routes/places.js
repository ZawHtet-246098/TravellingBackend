import express from "express";
const router = express.Router();

// import {
//   createPost,
//   getPosts,
//   likePost,
//   getPost,
// } from "../controllers/posts.js";

import { creatPlace, getPlaces } from "../controllers/places.js";

router.post("/", creatPlace);
router.get("/", getPlaces);

export default router;
