import axios from 'axios'

export function addCard(card) {
  return {
    type: 'ADD_CARD',
    card,
  }
}

export function startAddCard(card) {
  return (dispatch) => {
    return axios
      .post('http://localhost:3700/cards', card)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addCard(res.data))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

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
