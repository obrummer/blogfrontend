import React, { useState } from 'react';
const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [view, setView] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(blog.likes);
  

  const toggleVisibility = () => {
    setView(!view);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const updateBlog = () => {
    let updatedBlog = { title: blog.title, author: blog.author, url: blog.url };
    updatedBlog.user = blog.user.id;
    updatedBlog.likes = blog.likes+1;
    addLike(blog.id, updatedBlog);
    setCurrentLikes(currentLikes+1);
  };

  const deleteBlog = () => {
    if (window.confirm('Do you really want to remove the blog?')) {
      removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle} id='#blogitem' >
      <p onClick={toggleVisibility}>Title: {blog.title} Author: {blog.author} <button onClick={toggleVisibility}>{view ? 'hide' : 'view'}</button></p>
      {view ?
        (<>
          <p>Url: {blog.url}</p>
          <p>Likes: {currentLikes} <button onClick={updateBlog}>like</button></p>
          {user.name === blog.user.name ? <button onClick={deleteBlog}>remove</button> : null}
        </>)
        : null}
    </div>
  );
};

export default Blog;
