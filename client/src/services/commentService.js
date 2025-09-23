import API from "./api";

// Create a comment for a post (requires login)
export const createComment = (postId, commentData) =>
  API.post(`/comments/post/${postId}`, commentData);

// Get all comments for adminDashboard
export const getAllComments = () => API.get("/comments");

// Get all comments for a post (public)
export const getCommentsByPost = (postId) =>
  API.get(`/comments/post/${postId}`);

// Update a comment (requires login & ownership/admin)
export const updateComment = (commentId, commentData) =>
  API.patch(`/comments/${commentId}`, commentData);

// Delete a comment (requires login & ownership/admin)
export const deleteComment = (commentId) =>
  API.delete(`/comments/${commentId}`);
