import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async () => {
    if (!blog._id) {
      console.error("El ID del blog está vacío o no está definido.");
      return;
    }

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user._id, // Mantiene la referencia del usuario
    };

    try {
      const returnedBlog = await blogService.update(blog._id, updatedBlog);
      updateBlog({ ...returnedBlog, user: blog.user }); // Mantiene el usuario
    } catch (error) {
      console.error("Error al actualizar likes:", error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      console.log("Eliminando blog con ID:", blog._id); // Log para depurar
      deleteBlog(blog._id).catch((error) => {
        console.error("Error al eliminar el blog:", error); // Log de error si algo falla
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {user && blog.user?.username === user.username && (
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

export default Blog;
