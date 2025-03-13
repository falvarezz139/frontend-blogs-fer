import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`; // Establecer el token
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }, // Añadir el token al encabezado
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

// Actualizar likes
const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

// Eliminar un blog
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }, // Añadir el token al encabezado
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config); // Realizar la solicitud DELETE
    return response.data; // Devolver los datos de la respuesta (si es necesario)
  } catch (error) {
    console.error("Error al eliminar el blog:", error);
    throw error; // Lanzar el error para manejarlo en el componente
  }
};

export default { getAll, create, update, setToken, deleteBlog }; // Exportar la nueva función
