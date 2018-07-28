const defaultState = {
  fname: 'Gulshan',
  lname: 'kumar'
}

const user = (state = defaultState, action) => {
  switch (action.type) {
  case 'APPEND':
    return state = [...state, action.payload]

  default:
    return state
  }
}

export default user
