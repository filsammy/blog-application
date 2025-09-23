import API from "./api";

// Create a new post (requires login)
export const addPost = (postData) => API.post("/posts", postData);

// Get all posts (public)
export const getPosts = () => API.get("/posts");

// Get single post by ID (public)
export const getPostById = (id) => API.get(`/posts/${id}`);

// Update a post (requires login & ownership/admin)
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);

// Delete a post (requires login & ownership/admin)
export const deletePost = (id) => API.delete(`/posts/${id}`);
