import PropTypes from "prop-types";

const BlogForm = ({ newBlog, setNewBlog, addBlog }) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  newBlog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  setNewBlog: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
