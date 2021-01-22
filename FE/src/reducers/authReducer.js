// import { checkTimestampAge } from '../hooks/useVerifyTimestamp'

// const refreshTimestamp = (oldTimestamp) => {
//   if (checkTimestampAge(oldTimestamp) || !oldTimestamp) return Date.now()
//   return oldTimestamp
// }

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
    default:
      return state
  }
}
