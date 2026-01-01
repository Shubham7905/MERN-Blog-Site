import API from "./axios";

export const fetchBlogs = () => API.get("/blogs");

export const fetchBlogById = (id) => API.get(`/blogs/${id}`);

export const likeBlog = (id) => API.post(`/blogs/${id}/like`);

export const commentBlog = (id, text) => API.post(`/blogs/${id}/comment`, {text});

export const createBlog = (formData) => API.post("/blogs", formData, {headers: {"Content-Type": "multipart/form-data"}});

export const updateBlog = (id, formData) => API.patch(`/blogs/${id}`, formData, {headers: {"Content-Type": "multipart/form-data"}});