import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const fetchBlogs = (page) => API.get(`/blogs?page=${page}`);
export const fetchBlogsByCreator = (name) => API.get(`/blogs/creator?name=${name}`);
export const fetchBlogsBySearch = (searchQuery) => API.get(`/blogs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createBlog = (newBlog) => API.post('/blogs', newBlog);
export const likeBlog = (id) => API.patch(`/blogs/${id}/likeBlog`);
export const comment = (value, id) => API.post(`/blogs/${id}/commentBlog`, { value });
export const updateBlog = (id, updatedBlog) => API.patch(`/blogs/${id}`, updatedBlog);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
