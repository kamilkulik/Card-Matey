import { AuthAction } from '../actions';
import { AuthActionType } from '../actionTypes';

interface AuthActionState {
  uid?: string;
  timestamp?: number;
}

const defaultState = {
  uid: null,
  timestamp: null,
};

export default (state: AuthActionState = {}, action: AuthAction): AuthActionState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        uid: action.uid,
        timestamp: Date.now(),
      };
    case AuthActionType.LOGOUT:
      return {};
    default:
      return state;
  }
};
