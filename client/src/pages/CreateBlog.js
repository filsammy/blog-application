import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { notifySuccess, notifyError } from "../components/Notification";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      notifyError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      notifySuccess("Blog created successfully!");
      navigate("/blogs"); // redirect to blog list
    } catch (error) {
      notifyError(error.response?.data?.message || "Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 text-light">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog here..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-horror" disabled={loading}>
          {loading ? "Posting..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
