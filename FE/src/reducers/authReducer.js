export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid,
        timestamp: Date.now(),
      }
    case 'LOGOUT':
      return {}
    case 'REFRESH_TOKEN':
      return {
        ...state,
        timestamp: Date.now(),
      }
    default:
      return state
  }
}
