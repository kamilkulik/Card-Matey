import { AuthAction } from '../actions';
import { AuthActionType } from '../actionTypes';

interface AuthState {
  uid?: string;
  timestamp?: number;
}

export default (state: AuthState = {}, action: AuthAction): AuthState => {
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
