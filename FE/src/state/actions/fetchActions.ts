import { FetchActionType } from '../actionTypes';

export interface FetchingAction {
  type: FetchActionType.FETCHING;
  status: FetchActionType.FETCHING;
}

export interface FetchedAction {
  type: FetchActionType.FETCHED;
  status: FetchActionType.FETCHED;
}

export interface FetchErrorAction {
  type: FetchActionType.FETCH_ERR;
  status: FetchActionType.FETCH_ERR;
  error: string;
}

export type FetchAction = FetchingAction | FetchedAction | FetchErrorAction;
