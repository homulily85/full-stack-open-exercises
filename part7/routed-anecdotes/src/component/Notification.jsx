const Notification = ({ content }) => {
  if (!content) {
    return null
  } else {
    return <p>{content}</p>
  }
}

export default Notification