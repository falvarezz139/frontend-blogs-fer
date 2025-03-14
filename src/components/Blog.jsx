import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 };
      const returnedBlog = await blogService.update(blog._id, updatedBlog);
      setLikes(returnedBlog.likes);
      updateBlog({ ...returnedBlog, user: blog.user });
    } catch (error) {
      console.error("Error al actualizar likes:", error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog._id).catch((error) => {
        console.error("Error al eliminar el blog:", error);
      });
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            Likes: {likes}{" "}
            <button onClick={handleLike} aria-label={`Like ${blog.title}`}>
              like
            </button>
          </p>
          <p className="blog-user">{blog.user?.name}</p>
          {blog.user?.username === user?.username && (
            <button
              onClick={handleDelete}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default Blog;
