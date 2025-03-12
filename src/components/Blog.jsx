import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog }) => {
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
      user: blog.user._id, // Asegúrate de que la referencia al usuario sea correcta
    };

    try {
      // Actualiza el blog con el _id correcto
      const returnedBlog = await blogService.update(blog._id, updatedBlog);

      // Actualizamos el blog específico con el usuario
      updateBlog({
        ...returnedBlog,
        user: blog.user, // Añadimos explícitamente el usuario
      });
    } catch (error) {
      console.error("Error al actualizar likes:", error);
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
          <p>{blog.user?.name}</p> {/* Mostrar el nombre del usuario */}
        </div>
      )}
    </div>
  );
};

export default Blog;
