import React from "react";

const Blog = ({ blog }) => {
  return (
    <div>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
    </div>
  );
};

export default Blog;
