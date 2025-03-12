import React, { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
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
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNewBlog({ title: "", author: "", url: "" });
      setErrorMessage("Blog added successfully");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      console.error(
        "Error en la creación del blog:",
        exception.response || exception.message
      );
      setErrorMessage(
        `Error: ${
          exception.response ? exception.response.data.error : exception.message
        }`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
          <p>{user.name} logged in</p>
          <BlogForm
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            addBlog={addBlog}
          />
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
      <Notification message={errorMessage} />
    </div>
  );
};

export default App;
