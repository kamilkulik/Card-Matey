export function fetching() {
  return {
    type: 'FETCHING',
    status: 'FETCHING',
  }
}

export function fetched() {
  return {
    type: 'FETCHED',
    status: 'FETCHED',
  }
}

export function fetchErr(error) {
  return {
    type: 'FETCH_ERR',
    error,
  }
}
