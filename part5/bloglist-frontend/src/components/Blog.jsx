import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const toggle = () => {
    setVisible(!visible)
  }

  const updateBlog = (event) => {
    updateLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
    })
  }

  const remove = (event) => {
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} <button onClick={toggle}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggle}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={updateBlog}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog