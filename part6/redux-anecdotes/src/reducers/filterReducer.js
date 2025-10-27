const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.payload
    default:
      return state
  }
}

export const filterByContent = content => {
  return {
    type: 'FILTER_CHANGE',
    payload: content
  }
}

export default filterReducer