import { useEffect, useState } from "react";
import api from "../services/api";
import { notifySuccess, notifyError } from "../components/Notification";
import LoadingState from "../components/LoadingState";
import { Table, Button, Modal, Alert, Form, InputGroup } from "react-bootstrap";

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, type: '', id: '', title: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [stats, setStats] = useState({ totalPosts: 0, totalComments: 0 });
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setAuthError(true);
      setLoading(false);
      return;
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  useEffect(() => {
    // Filter comments based on search term
    const filtered = comments.filter(comment =>
      comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [comments, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Check if user is logged in and has token
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        notifyError("Please log in to access admin dashboard");
        setAuthError(true);
        setLoading(false);
        return;
      }

      // Fetch posts and comments separately to handle individual errors
      let postsData = [];
      let commentsData = [];

      try {
        const postsRes = await api.get("/posts");
        postsData = postsRes.data || [];
      } catch (postsErr) {
        console.error("Failed to load posts:", postsErr);
        if (postsErr.response?.status === 401) {
          notifyError("Authentication failed. Please log in again.");
          setAuthError(true);
        } else {
          notifyError("Failed to load posts");
        }
      }

      try {
        const commentsRes = await api.get("/comments");
        commentsData = commentsRes.data || [];
      } catch (commentsErr) {
        console.error("Failed to load comments:", commentsErr);
        if (commentsErr.response?.status === 401) {
          notifyError("Authentication failed. Please log in again.");
          setAuthError(true);
        } else if (commentsErr.response?.status === 403) {
          notifyError("Admin privileges required to view all comments");
        } else {
          notifyError("Failed to load comments");
        }
      }

      setPosts(postsData);
      setComments(commentsData);

      // Calculate stats
      setStats({
        totalPosts: postsData.length,
        totalComments: commentsData.length
      });

    } catch (err) {
      console.error("Failed to load admin data:", err);
      notifyError("Failed to load admin data. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = (type, id, title) => {
    setDeleteModal({ show: true, type, id, title });
  };

  const hideDeleteModal = () => {
    setDeleteModal({ show: false, type: '', id: '', title: '' });
  };

  const confirmDelete = async () => {
    const { type, id } = deleteModal;

    try {
      if (type === 'post') {
        await handleDeletePost(id);
      } else if (type === 'comment') {
        await handleDeleteComment(id);
      }
      hideDeleteModal();
    } catch (error) {
      // Error handling is already done in the individual delete functions
      hideDeleteModal();
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      const updatedPosts = posts.filter((p) => p._id !== postId);
      setPosts(updatedPosts);
      setStats(prev => ({ ...prev, totalPosts: updatedPosts.length }));
      notifySuccess("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
      notifyError(error.response?.data?.message || "Failed to delete post");
      throw error; // Re-throw to handle in confirmDelete
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      const updatedComments = comments.filter((c) => c._id !== commentId);
      setComments(updatedComments);
      setStats(prev => ({ ...prev, totalComments: updatedComments.length }));
      notifySuccess("Comment deleted successfully!");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      notifyError(error.response?.data?.message || "Failed to delete comment");
      throw error; // Re-throw to handle in confirmDelete
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return <LoadingState />;
  }

  if (authError) {
    return (
      <div className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You need to be logged in as an administrator to access this page.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <Button className="btn-horror-universal" onClick={fetchData}>
          Refresh Data
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card card-gothic">
            <div className="card-body">
              <h5 className="card-title">Total Posts</h5>
              <h3 className="card-text">{stats.totalPosts}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-gothic text-white">
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
              <h3 className="card-text">{stats.totalComments}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-3">
        <Button
          className={`btn-horror-universal me-2 ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts ({filteredPosts.length})
        </Button>

        <Button
          className={`btn-horror-universal ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments ({filteredComments.length})
        </Button>

      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button className="btn-horror" onClick={() => setSearchTerm('')}>
              Clear
            </Button>
          )}
        </InputGroup>
      </div>

      {/* Posts Table */}
      {activeTab === 'posts' && (
        <>
          <h4 className="mb-3">All Posts</h4>
          {filteredPosts.length === 0 ? (
            <Alert variant="info">No posts found.</Alert>
          ) : (
            <Table striped bordered hover responsive className="card-gothic">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post._id}>
                    <td title={post.title}>
                      {truncateText(post.title, 50)}
                    </td>
                    <td>{post.author?.name || 'Unknown Author'}</td>
                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => showDeleteModal('post', post._id, post.title)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}

      {/* Comments Table */}
      {activeTab === 'comments' && (
        <>
          <h4 className="mb-3">All Comments</h4>
          {filteredComments.length === 0 ? (
            <Alert variant="info">No comments found.</Alert>
          ) : (
            <Table striped bordered hover responsive className="card-gothic">
              <thead>
                <tr>
                  <th>Comment</th>
                  <th>User ID</th>
                  <th>Post ID</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment) => (
                  <tr key={comment._id}>
                    <td title={comment.comment}>
                      {truncateText(comment.comment, 100)}
                    </td>
                    <td>{comment.userId}</td>
                    <td>{comment.postId}</td>
                    <td>{new Date(comment.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => showDeleteModal('comment', comment._id, comment.comment)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr >
                ))
                }
              </tbody >
            </Table >
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal.show} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {deleteModal.type}?
          <br />
          <strong>"{truncateText(deleteModal.title, 100)}"</strong>
          <br />
          <small className="text-muted">This action cannot be undone.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default AdminDashboard;
