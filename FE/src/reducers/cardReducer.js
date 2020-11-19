const initialState = []

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return action.cards
    case 'ADD_CARD':
      return [...state, action.card]
    default:
      return state
  }
}
