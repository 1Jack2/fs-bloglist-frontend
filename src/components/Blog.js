const Blog = ({blog, toggleVisible, handleLikeClicked}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisible}>{blog._visible ? 'hide' : 'view'}</button>
      </div>
      {
        blog._visible
          ? (
            <div>
              <div>
                {blog.url}
              </div>
              <div>
                {blog.likes}
                <button onClick={handleLikeClicked}>
                  like
                </button>
              </div>
              <div>
                {blog.author}
              </div>
            </div>
          )
          : <></>
      }
    </div >

  )
}

export default Blog
