const initialState = []

export default function cardReducer(state = initialState, action) {
  console.log('reducer: ')
  console.log(action)
  switch (action.type) {
    case 'SET_CARDS':
      return action.cards
    default:
      return state
  }
}
