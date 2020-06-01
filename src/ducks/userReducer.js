import axios from 'axios'

const initialState = {
  email: null,
  firstName: null,
  lastName: null
}

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export const requestUserData = () => {
  const payload = axios.get('/auth/user-data').then(res => res.data)

  return {
    type: REQUEST_USER_DATA,
    payload
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_DATA + '_FULFILLED':
      const { email, firstName, lastName } = action.payload.user
      return { email, firstName, lastName }
    default:
      return state
  }
}
