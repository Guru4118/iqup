import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // adjust if needed

// Add auth token if required
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (blog) => API.post('/blogs', blog);
export const updateBlog = (id, blog) => API.put(`/blogs/${id}`, blog);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);
