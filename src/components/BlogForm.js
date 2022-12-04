import {useState} from 'react'

const BlogForm = ({
  createNote,
}) => {
  // new blog
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    createNote(newBlog)
  }

  return (<div>
    <form onSubmit={handleSubmit}>
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
  </div>
  )
}

export default BlogForm
