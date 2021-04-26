import { FetchingAction, FetchedAction, FetchErrorAction } from '../actions';
import { FetchActionType } from '../actionTypes';

export function fetching(): FetchingAction {
  return {
    type: FetchActionType.FETCHING,
    status: FetchActionType.FETCHING,
  };
}

export function fetched(): FetchedAction {
  return {
    type: FetchActionType.FETCHED,
    status: FetchActionType.FETCHED,
  };
}

export function fetchErr(error: string): FetchErrorAction {
  return {
    type: FetchActionType.FETCH_ERR,
    status: FetchActionType.FETCH_ERR,
    error,
  };
}
