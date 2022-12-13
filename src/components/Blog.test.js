import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render content', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url'
  }

  const mockHandler = jest.fn()

  render( <Blog blog={blog} toggleVisible={mockHandler} />)

  const title = screen.getByText('test title')
  const author = screen.queryByText('test author')
  const url = screen.queryByText('test url')
  expect(title).toBeDefined()
  expect(author).toBeNull()
  expect(url).toBeNull()
})

test('show detail', async () => {
  const user = userEvent.setup()

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5
  }

  const toggleVisible = () => {
    blog._visible = !blog._visible
  }

  render(<Blog blog={blog} toggleVisible={toggleVisible} />)

  const button = screen.getByText('view')
  // TODO: 点击button后如何重新渲染
  await user.click(button)
  // console.log(blog);

  const author = screen.getByText('test author')
  const url = screen.getByText('test url')
  const likes = screen.getByPlaceholderText('blog-likes')
  // console.log(likes);
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5,
    _visible: true,
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} showBlog={() => true}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('blog-title')
  const author = screen.getByPlaceholderText('blog-author')
  const url = screen.getByPlaceholderText('blog-url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing title')
  await user.type(author, 'testing author')
  await user.type(url, 'testing url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
