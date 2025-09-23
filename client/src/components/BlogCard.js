import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="card card-gothic h-100 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{blog.title}</h4>
        <p className="card-text">
          {blog.content.length > 100
            ? blog.content.substring(0, 100) + "..."
            : blog.content}
        </p>
        <small className="text-light d-block">
          By {blog.author?.name || "Unknown"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div className="card-footer text-end">
        <Link to={`/blogs/${blog._id}`} className="btn btn-sm btn-horror">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
