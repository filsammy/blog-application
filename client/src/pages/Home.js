import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";
import LoadingState from "../components/LoadingState";
import { notifyError } from "../components/Notification";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/posts");
        setBlogs(res.data.slice(0, 3)); // get latest 3
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
    <div className="container">
      <div className="text-center my-4 text-light">
        <h1>Welcome to My Blog</h1>
        <p className="lead">Read the latest posts from our community.</p>
      </div>

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-3">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <a href="/blogs" className="btn btn-horror-universal">
          See All Blogs
        </a>
      </div>
    </div>
  );
}

export default Home;
