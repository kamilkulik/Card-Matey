const initialState = []

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, action.card]
    case 'SET_CARDS':
      return action.cards
    case 'UPDATE_CARD':
      return state.map((card) => {
        if (action.id === card.id) {
          return {
            ...card,
            ...action.updates,
          }
        }
        return card
      })
    case 'DELETE_CARD':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}
