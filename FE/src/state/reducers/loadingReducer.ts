import { FetchAction, AuthAction } from '../actions';
import { FetchActionType, AuthActionType } from '../actionTypes';

interface FetchDefaultState {
  status: string;
  error?: string;
}

const initialState: FetchDefaultState = { status: 'IDLE' };

export default function loadingReducer(state = initialState, action: FetchAction | AuthAction) {
  switch (action.type) {
    case FetchActionType.FETCHING:
      return { ...state, status: action.status };
    case FetchActionType.FETCHED:
      return { ...state, status: action.status };
    case FetchActionType.FETCH_ERR:
      return { ...state, status: action.status, error: action.error };
    case AuthActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
