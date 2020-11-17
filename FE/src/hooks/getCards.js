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
      .get(`http://localhost:3700/cards${card ? '/' + card : ''}`)
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
