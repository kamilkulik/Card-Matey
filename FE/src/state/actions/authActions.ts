/* eslint-disable arrow-body-style */

import { AuthActionType } from '../actionTypes';

export interface RefreshTokenAction {
  type: AuthActionType.REFRESH_TOKEN;
}

export interface LoginAction {
  type: AuthActionType.LOGIN;
  uid: string;
}

export interface LogoutAction {
  type: AuthActionType.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction | RefreshTokenAction;
