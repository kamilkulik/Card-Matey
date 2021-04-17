import { FetchAction, AuthAction } from '../actions';

const initialState = { status: 'IDLE' };

export default function loadingReducer(state = initialState, action: FetchAction | AuthAction) {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, status: action.status };
    case 'FETCHED':
      return { ...state, status: action.status };
    case 'FETCH_ERR':
      return { ...state, status: action.status, error: action.error };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
