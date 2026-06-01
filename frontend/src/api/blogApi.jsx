import axios from 'axios';
import { API_BASE_URL } from './config';

const API_URL = `${API_BASE_URL}/api/blogs`;

export const fetchBlogs = () => axios.get(API_URL);
export const fetchBlogById = (id) => axios.get(`${API_URL}/${id}`);
export const createBlog = (data) => axios.post(API_URL, data);
export const deleteBlog = (id) => axios.delete(`${API_URL}/${id}`);
