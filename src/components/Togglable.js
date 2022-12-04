import {useState} from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hiddenWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}
  return (
    <div>
      <button
        style={hiddenWhenVisible}
        onClick={() => {setVisible(true)}}>
        {props.buttonLable}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => {setVisible(false)}}> cancel </button>
      </div>
    </div>
  )
}

export default Togglable
