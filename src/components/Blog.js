const Blog = ({ blog, toggleVisible, handleLike, handleDelete, showBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title}
        <button onClick={toggleVisible}>{blog._visible ? 'hide' : 'view'}</button>
      </div>
      {
        blog._visible
          ? (
            <div className="blog">
              <div>
                {blog.url}
              </div>
              <div id='blog-likes' placeholder='blog-likes' >
                {blog.likes}
                <button onClick={() => handleLike(blog)}> like </button>
              </div>
              <div>
                {blog.author}
              </div>
              {
                showBlog(blog)
                  ? <button onClick={() => handleDelete(blog)}>delete</button>
                  : <></>
              }
            </div>
          )
          : <></>
      }
    </div >

  )
}

export default Blog
