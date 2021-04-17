import { useEffect, useReducer } from 'react'
import axios from 'axios'

const cache = {}

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

const useGetData = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!url) return
    dispatch({ type: 'FETCHING' })
    if (cache[url]) {
      const data = cache[url]
      dispatch({ type: 'FETCHED', payload: data })
    } else {
      axios
        .get(url)
        .then((res) => {
          cache[url] = res.data
          dispatch({ type: 'FETCHED', payload: res.data })
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_ERR', payload: err })
        })
    }
  }, [])

  return { ...state }
}

export default useGetData

/*
DOCUMENTATION

PURPOSE: fetch data from IP

how it works:

arguments:

*/
