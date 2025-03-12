import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleLike = async () => {
    // Verificamos si el blog tiene la propiedad `id` o `_id`
    if (!blog._id) {
      console.error("El ID del blog está vacío o no está definido.");
      return; // No hacer nada si el ID no está disponible
    }

    // Actualizamos el objeto del blog con el like incrementado
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1, // Incrementar el número de likes
      user: blog.user._id, // Asegurarse de que la referencia al usuario es correcta
    };

    try {
      // Usamos el _id correcto dependiendo de la estructura del objeto
      const returnedBlog = await blogService.update(blog._id, updatedBlog);

      // Actualizamos solo el blog específico en el estado
      updateBlog(returnedBlog); // Asegúrate de que esta función solo actualice el blog correcto
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
          <p>{blog.user?.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
