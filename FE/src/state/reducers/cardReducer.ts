import { AuthActionType, CardActionType } from '../actionTypes';
import { AuthAction, CardAction } from '../actions';
import { Card } from '../../shared';

const initialState: Card[] = [];

type CardState = Card[];

export default function cardReducer(state: CardState = initialState, action: CardAction | AuthAction): CardState {
  switch (action.type) {
    case CardActionType.ADD_CARD:
      return [...state, action.cards];
    case CardActionType.SET_CARDS:
      return action.cards;
    case CardActionType.UPDATE_CARD:
      return state.map((card) => {
        if (action.id === card.id) {
          return {
            ...card,
            ...action.updates,
          };
        }
        return card;
      });
    case CardActionType.DELETE_CARD:
      return state.filter(({ id }) => id !== action.id);
    case AuthActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
