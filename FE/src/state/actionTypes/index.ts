export enum CardActionType {
  ADD_CARD = 'ADD_CARD',
  SET_CARDS = 'SET_CARDS',
  UPDATE_CARD = 'UPDATE_CARD',
  DELETE_CARD = 'DELETE_CARD',
}

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum FetchActionType {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERR = 'FETCH_ERR',
}
