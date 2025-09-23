import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/blogService";
import { getCommentsByPost, createComment, updateComment, deleteComment } from "../services/commentService";
import { deletePost } from "../services/blogService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { notifySuccess, notifyError } from "../components/Notification";
import { Card, Form, Button, ListGroup } from "react-bootstrap";

function SingleBlog() {
  const { id: postId } = useParams();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  // Load post + comments
  useEffect(() => {
    getPostById(postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.error("Error loading post:", error);
        notifyError("Failed to load post");
      });

    getCommentsByPost(postId)
      .then((res) => setComments(res.data))
      .catch(() => notifyError("Failed to load comments"));
  }, [postId]);

  const handleDeleteBlog = async () => {
    if (!user) return;

    // More flexible authorization check - try different possible author field names
    const authorId = post.author?._id || post.author?.id || post.authorId || post.userId || post.createdBy;
    const canDelete = user.isAdmin || authorId === user.id;

    if (!canDelete) {
      notifyError("You are not authorized to delete this blog.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deletePost(postId);
      notifySuccess("Blog deleted successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Delete error:", error);
      notifyError("Failed to delete the blog.");
    }
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await createComment(postId, { comment: newComment });
      setComments([res.data, ...comments]);
      setNewComment("");
      notifySuccess("Comment added!");
    } catch {
      notifyError("Failed to add comment");
    }
  };

  // Open editing mode
  const handleUpdateComment = (commentId, currentText) => {
    setEditingComment({ id: commentId, text: currentText });
  };

  // Save edited comment
  const handleSaveComment = async () => {
    if (!editingComment) return;

    try {
      const res = await updateComment(editingComment.id, {
        comment: editingComment.text,
      });

      setComments(
        comments.map((c) => (c._id === editingComment.id ? res.data : c))
      );
      setEditingComment(null);
      notifySuccess("Comment updated!");
    } catch {
      notifyError("Failed to update comment");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
      notifySuccess("Comment deleted!");
    } catch {
      notifyError("Failed to delete comment");
    }
  };

  if (!post) return <p>Loading...</p>;

  // More flexible check for showing delete button
  const authorId = post.author?._id || post.author?.id || post.authorId || post.userId || post.createdBy;
  const shouldShowDeleteButton = user && (user.isAdmin || authorId === user.id);

  return (
    <div className="mt-4">
      {shouldShowDeleteButton && (
        <div className="d-flex justify-content-end mb-2">
          <Button
            className="btn-horror-universal btn-sm"
            onClick={handleDeleteBlog}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Delete Blog
          </Button>
        </div>
      )}

      {/* Blog card */}
      <Card className="mb-4 shadow-sm card-gothic">
        <Card.Body>
          <Card.Title className="py-2">{post.title}</Card.Title>
          <Card.Text className="mb-0 pt-2">{post.content}</Card.Text>
          <small className="text-light">
            By {post.author?.name || 'Anonymous'} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </Card.Body>
      </Card>

      <h4>Comments</h4>
      {user ? (
        <Form onSubmit={handleAddComment} className="mb-3">
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
          </Form.Group>
          <Button type="submit" className="mt-2 btn-horror-universal">
            Add Comment
          </Button>
        </Form>
      ) : (
        <p className="text-muted">You must be logged in to comment.</p>
      )}

      <ListGroup>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <ListGroup.Item
              key={c._id}
              className="d-flex card-gothic justify-content-between align-items-center"
            >
              {editingComment && editingComment.id === c._id ? (
                <>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editingComment.text}
                    onChange={(e) =>
                      setEditingComment({ ...editingComment, text: e.target.value })
                    }
                  />
                  <div className="d-flex gap-2">
                    <Button className="btn-horror btn-sm" onClick={handleSaveComment}>
                      Save
                    </Button>
                    <Button className="btn-horror btn-sm" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span>{c.comment}</span>
                  {user && (
                    <div className="d-flex gap-2">
                      {/* Show Update only if the user is the author */}
                      {user.id === c.userId && (
                        <Button
                          className="btn-horror btn-sm"
                          onClick={() => handleUpdateComment(c._id, c.comment)}
                        >
                          Update
                        </Button>
                      )}

                      {/* Show Delete if the user is the author or an admin */}
                      {(user.isAdmin || user.id === c.userId) && (
                        <Button
                          className="btn-horror btn-sm"
                          onClick={() => handleDeleteComment(c._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
}

export default SingleBlog;
