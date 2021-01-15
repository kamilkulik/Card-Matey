export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        timestamp: new Date().toISOString(),
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
