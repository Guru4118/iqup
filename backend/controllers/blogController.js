const Blog = require('../models/Blog');
const redisClient = require('../config/redis');

const getBlogs = async (req, res) => {
  try {
    // const { author } = req.query;

    // const cacheKey = author ? `blogs_author_${author}` : 'allBlogs';
    // const cached = await redisClient.get(cacheKey);
    // if (cached) return res.json(JSON.parse(cached));

    // const filter = author ? { author } : {};
    const blogs = await Blog.find()/*.populate('author', 'username')*/; // temporarily remove populate to isolate issue

    // await redisClient.set(cacheKey, JSON.stringify(blogs), { EX: 60 });
    res.json(blogs);
  } catch (err) {
    console.error('Error in getBlogs:', err);
    res.status(500).json({ error: err.message });
  }
};



const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    await redisClient.del('allBlogs');
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redisClient.del('allBlogs');
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    await redisClient.del('allBlogs');
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
