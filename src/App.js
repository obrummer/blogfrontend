import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setError(true);
      messageSetter('', 'Wrong credentials');
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const messageSetter = (name, note) => {
    setMessage(`${name} ${note}`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await blogService.create(blogObject);
      // setBlogs(blogs.concat(newBlog));
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      );
      messageSetter(user.name, `created succesfully blog ${blogObject.title}.`);
    } catch (exception) {
      setError(true);
      messageSetter('', 'Wrong info');
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const addLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      // setBlogs(blogs.concat(updatedBlog));
      console.log(updatedBlog);
      messageSetter('', `${blogObject.title} has now ${blogObject.likes} likes.`);
    } catch (exception) {
      setError(true);
      messageSetter('', 'Error');
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const removeBlog = async (blogObject) => {
    try {
      const removedBlog = await blogService.remove(blogObject.id);
      console.log(removedBlog);
      setBlogs(blogs.filter(blog => {
        return blog.id !== blogObject.id;
      }));
      messageSetter('', `${blogObject.title} has now been removed.`);
    } catch (exception) {
      setError(true);
      messageSetter('', 'Error');
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };


  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} error={error}/>

      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged in</p><button onClick={() => handleLogout()}>Logout</button>
          <br />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} user={user} removeBlog={removeBlog}/>
          )}
        </div>}

    </div>
  );
};

export default App;