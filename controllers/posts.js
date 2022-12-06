import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const route = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find().sort({ _id: -1 });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(200).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};

export const likePost = async (req, res) => {
  const post = req.body;
  // console.log(post);

  if (!post.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(post.id))
    return res.status(404).send(`NO post with id: ${id}`);

  let exactPost = await PostMessage.findById(post.id);

  const index = exactPost.likes.findIndex((id) => id === String(post.userId));
  console.log(post.userId);
  console.log(exactPost.likes);
  console.log(index);
  if (index === -1) {
    exactPost.likes.push(post.userId);
  } else {
    exactPost.likes = exactPost.likes.filter(
      (id) => id !== String(post.userId)
    );
    console.log("i am here");
  }
  console.log(exactPost.likes);

  const updatedPost = await PostMessage.findByIdAndUpdate(post.id, exactPost, {
    new: true,
  });
  // console.log(updatedPost);

  res.status(200).json(updatedPost);
};
