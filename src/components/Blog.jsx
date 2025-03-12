import React from "react";

const Blog = ({ blog }) => {
  return (
    <div>
      <h3>
        {blog.title} | | {blog.author}
      </h3>
    </div>
  );
};

export default Blog;
