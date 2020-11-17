import axios from 'axios'

export function setCards(cards) {
  return {
    type: 'SET_CARDS',
    cards,
  }
}

export function startSetCards() {
  return (dispatch) => {
    let cards = []
    return axios
      .get(`http://localhost:3700/cards`)
      .then((res) => {
        res.data.forEach((card) => {
          cards.push(card)
        })
        dispatch(setCards(cards))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
