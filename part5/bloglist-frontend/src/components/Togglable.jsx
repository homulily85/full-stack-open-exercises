import { useImperativeHandle, useState } from 'react'

const Togglable = (prop) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'None' }
  const hideWhenVisible = { display: visible ? 'None' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(prop.ref, () => {
    return { toggleVisibility }
  })

  return <>
    <button style={hideWhenVisible}
            onClick={toggleVisibility}>{prop.buttonLabel}</button>
    <div style={showWhenVisible}>
      {prop.children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  </>

}

export default Togglable