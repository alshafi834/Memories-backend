import mongoose from "mongoose";
import PostData from "../models/posts_model.js";

export const getPosts = async (req, res) => {
  try {
    const postsData = await PostData.find();
    res.status(200).json(postsData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostData(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post available with this id");
  }

  const updatePost = await PostData.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post available with this id");
  }

  await PostData.findByIdAndRemove(_id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post available with this id");
  }

  const post = await PostData.findById(id);
  const updatedPost = await PostData.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
