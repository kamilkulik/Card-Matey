const initialState = { status: 'IDLE' }

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case ('FETCHING'):
      return { ...state, status: action.status }
    case ('FETCHED'):
      return { ...state, status: action.status }
    case ('FETCH_ERR'):
      return { ...state, status: action.status, error: action.error }
    default:
      return state
  }
}
