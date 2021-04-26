import { Dispatch } from 'redux';
import firebase, { googleAuthProvider } from '../../firebase/firebase';
import { AuthActionType } from '../actionTypes';
import { RefreshTokenAction, LoginAction, LogoutAction } from '../actions';

export const refreshToken = () => ({
  type: AuthActionType.REFRESH_TOKEN,
});

export const login = (uid: string) => ({
  type: AuthActionType.LOGIN,
  uid,
});

export const logout = () => ({
  type: AuthActionType.LOGOUT,
});

export const startLogin = () => {
  return (dispatch: Dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user: string | undefined = result.user?.uid;
        if (user) {
          return dispatch(login(user));
        }
        return dispatch(logout());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const startLogout = () => {
  return (dispatch: Dispatch) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        return dispatch(logout());
      });
  };
};
