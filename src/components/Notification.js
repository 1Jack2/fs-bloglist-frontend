const Notification = (props) => {
  console.log(props)
  const { notificationMsg, errorMsg } = props
  // console.log(notificationMsg, errorMsg)
  const errorStyle = {
    'color': 'red',
    'background': 'lightgrey',
    'fontSize': 20,
    'borderStyle': 'solid',
    'borderRadius': 5,
    'padding': 10,
    'marginBottom': 10,
  }

  const notificationStyle = { ...errorStyle, 'color': 'green' }

  if (errorMsg !== null) {
    return (
      <div className="error" style={errorStyle}>
        {errorMsg}
      </div>
    )
  }

  if (notificationMsg !== null) {
    return (
      <div className="notification" style={notificationStyle}>
        {notificationMsg}
      </div>
    )
  }
  return null
}

export default Notification
