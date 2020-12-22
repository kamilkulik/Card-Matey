import { useEffect, useReducer } from 'react'
import axios from 'axios'

const initialState = { status: 'idle', data: '', error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'FETCHING ':
      return { ...initialState, status: 'fetching' }
    case 'FETCHED':
      return { ...initialState, status: 'fetched', data: action.payload }
    case 'FETCH_ERR':
      return { ...initialState, status: 'error', error: action.payload }
    default:
      return state
  }
}

const useGetCard = (card) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'FETCHING' })
    axios
      .get(`http://localhost:3700/cards${card ? `/${card}` : ''}`)
      .then((res) => {
        dispatch({ type: 'FETCHED', payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERR', payload: err })
      })
  }, [card])

  return { ...state }
}

export default useGetCard

/*
DOCUMENTATION

PURPOSE: fetch data from IP

how it works:
1. it checks what's the currently value of the --card-font-size CSS property
2. it calculates the right new font size based on desired font size on 13" laptop screen
3. if the current font set is different from the new calculated font, the hook will update
  the CSS variable thus the font-size

arguments:
targetFont - desired font size on 13" laptop
componentWidth - width of rendered React Component

*/
