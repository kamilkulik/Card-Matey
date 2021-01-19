export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        timestamp: Date.now(),
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
