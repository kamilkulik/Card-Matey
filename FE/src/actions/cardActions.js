import axios from 'axios'

// CREATE

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

// READ / SET UPON START

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

// UPDATE

export function updateCard(id, updates) {
  return {
    type: 'UPDATE_CARD',
    id,
    updates,
  }
}

export function startUpdateCard(updates, id) {
  return (dispatch) => {
    return axios
      .patch(`http://localhost:3700/cards/${id}`, updates)
      .then((res) => {
        const resId = res.data.id
        if (resId) dispatch(updateCard(resId, updates))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// DELETE

export function deleteCard(id) {
  return {
    type: 'DELETE_CARD',
    id,
  }
}

export function startDeleteCard(id) {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3700/cards/${id}`)
      .then((res) => {
        if (res.data.id) {
          dispatch(deleteCard(res.data.id))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
