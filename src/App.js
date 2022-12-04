import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const loggedBlogappUser = 'loggedBlogappUser'
  // new blog
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
      console.error(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(username, 'log out')
    window.localStorage.removeItem(loggedBlogappUser)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    const data = await blogService.create(newBlog)
    setBlogs(blogs.concat(data))
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type='text'
            value={newBlogTitle}
            onChange={({target}) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlogAuthor}
            onChange={({target}) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlogUrl}
            onChange={({target}) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

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
