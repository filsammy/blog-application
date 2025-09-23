import { useEffect, useState } from "react";
import api from "../services/api"; // axios instance
import BlogCard from "../components/BlogCard";
import LoadingState from "../components/LoadingState";
import { notifySuccess, notifyError } from "../components/Notification";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/posts");
        setBlogs(res.data);
        notifySuccess("Blogs loaded successfully.");
      } catch (error) {
        notifyError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <div className="row">
      {blogs.length === 0 ? (
        <p>No blogs yet. Be the first to post!</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-3">
            <BlogCard blog={blog} />
          </div>
        ))
      )}
    </div>
  );
}

export default Blog;
