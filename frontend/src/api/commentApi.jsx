import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Interceptor already in blogApi.js—reuse it (token from localStorage)
API.interceptors.request.use(req => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchComments = (blogId) =>
  API.get(`/blogs/${blogId}/comments`);

export const postComment = (blogId, text) =>
  API.post(`/blogs/${blogId}/comments`, { text });