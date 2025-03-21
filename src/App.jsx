import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs([...blogs, blog].sort((a, b) => b.likes - a.likes));
      setNewBlog({ title: "", author: "", url: "" });
      setErrorMessage("Blog added successfully");
      setTimeout(() => setErrorMessage(null), 5000);
    } catch (exception) {
      setErrorMessage(
        `Error: ${exception.response?.data.error || exception.message}`
      );
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs
        .map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog._id === id);
    if (!blogToDelete) return;

    if (
      !window.confirm(
        `Remove blog "${blogToDelete.title}" by ${blogToDelete.author}?`
      )
    )
      return;

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setErrorMessage("Blog deleted successfully");
      setTimeout(() => setErrorMessage(null), 5000);
    } catch (exception) {
      setErrorMessage("Error deleting blog");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog">
            <BlogForm
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              addBlog={addBlog}
            />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog._id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
      <Notification message={errorMessage} />
    </div>
  );
};

export default App;
