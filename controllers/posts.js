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
