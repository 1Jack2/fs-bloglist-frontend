const BlogForm = ({
  handleSubmit,
  newBlogTitle,
  handleBlogTitleChange,
  newBlogAuthor,
  handleBlogAuthorChange,
  newBlogUrl,
  handleBlogUrlChange,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type='text'
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
)

export default BlogForm
