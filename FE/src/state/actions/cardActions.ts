import { CardActionType } from '../actionTypes';
import { Card, Updates } from '../../shared';

export interface AddCardAction {
  type: CardActionType.ADD_CARD;
  cards: Card;
}
export interface SetCardsAction {
  type: CardActionType.SET_CARDS;
  cards: Card[];
}
export interface UpdateCardAction {
  type: CardActionType.UPDATE_CARD;
  id: string;
  updates: Updates;
}
export interface DeleteCardAction {
  type: CardActionType.DELETE_CARD;
  id: string;
}

export type CardAction = AddCardAction | SetCardsAction | UpdateCardAction | DeleteCardAction;
