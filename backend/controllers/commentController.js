const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  if (!req.user.id) {
      return res.status(401).json({ message: "Please log in to comment." });
    }
  try {
    const comment = await Comment.create({
      blog: req.params.blogId,
      author: req.user.id,
      text: req.body.text,
    });
   
    res.status(201).json(comment);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};

const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.params.blogId);
};

module.exports = {
  addComment,
  getCommentsByBlog,
};
