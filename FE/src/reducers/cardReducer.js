const initialState = []

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return action.cards
    default:
      return state
  }
}
