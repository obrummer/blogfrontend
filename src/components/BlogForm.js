import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title, url, author
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form id='form' onSubmit={addBlog}>
        <div>
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button id='#addBlogButton' type="submit">add blog</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;