import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const BlogList = ({blogs, setBlogs}) => {
  const toggleVisible = (blogId) => {
    setBlogs(
      blogs.map(blog => (
        blog.id === blogId
        ? {...blog, _visible: !blog._visible}
        : blog
      ))
    )
  }
  return <div>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} toggleVisible={() => toggleVisible(blog.id)}/>
    )}
  </div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const loggedBlogappUser = 'loggedBlogappUser'
  // Notification
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const notificationTimeout = 3000
  const setNewNotice = (notificationMsg, errorMsg) => {
    if (errorMsg) {
      setErrorMsg(errorMsg)
      setTimeout(() => {
        setErrorMsg(null)
      }, notificationTimeout);
    } else {
      setErrorMsg(null)
    }

    if (notificationMsg) {
      setNotificationMsg(notificationMsg)
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTimeout);
    } else {
      setNotificationMsg(null)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogappUser)
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {username, password}
    console.log('log in with', username, password);
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(loggedBlogappUser, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewNotice(null, exception.response.data.error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(username, 'log out')
    window.localStorage.removeItem(loggedBlogappUser)
    setUser(null)
  }

  const handleCreate = async (newBlog) => {
    try {
      const data = await blogService.create(newBlog)
      setBlogs(blogs.concat(data))
      setNewNotice(`a new blog ${data.title} by ${data.author} added`, null)
    } catch (exception) {
      setNewNotice(null, exception.response.data.error)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notificationMsg={notificationMsg} errorMsg={errorMsg} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notificationMsg={notificationMsg} errorMsg={errorMsg} />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLable='new note'>
          <h2>create new</h2>
          <BlogForm createNote={handleCreate} />
        </Togglable>
        <BlogList blogs={blogs} setBlogs={setBlogs}/>
      </div>
    )
  }

  return (
    <div>
      {
        user === null
          ? loginForm()
          : blogForm()
      }
    </div>
  )
}

export default App
