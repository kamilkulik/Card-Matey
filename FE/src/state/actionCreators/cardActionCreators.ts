import axios from 'axios';
import { Dispatch } from 'redux';
import { Card, Updates, AddCardAction, SetCardsAction, UpdateCardAction, DeleteCardAction } from '../actions';
import { CardActionType } from '../actionTypes';

// CREATE

export function addCard(cards: Card[]): AddCardAction {
  return {
    type: CardActionType.ADD_CARD,
    cards,
  };
}

export function startAddCard(card: Card) {
  return (dispatch: Dispatch) =>
    axios
      .post('http://localhost:3700/cards', card)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addCard(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

// READ / SET UPON START

export function setCards(cards: Card[]): SetCardsAction {
  return {
    type: CardActionType.SET_CARDS,
    cards,
  };
}

export function startSetCards() {
  return (dispatch: Dispatch) => {
    const cards: Card[] = [];
    return axios
      .get('http://localhost:3700/cards')
      .then((res) => {
        res.data.forEach((card: Card) => {
          cards.push(card);
        });
        dispatch(setCards(cards));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// UPDATE

export function updateCard(id: string, updates: Updates): UpdateCardAction {
  return {
    type: CardActionType.UPDATE_CARD,
    id,
    updates,
  };
}

export function startUpdateCard(updates: Updates, id: string) {
  return (dispatch: Dispatch) =>
    axios
      .patch(`http://localhost:3700/cards/${id}`, updates)
      .then((res) => {
        const resId: string = res.data.id;
        if (resId) dispatch(updateCard(resId, updates));
      })
      .catch((err) => {
        console.log(err);
      });
}

// DELETE

export function deleteCard(id: string): DeleteCardAction {
  return {
    type: CardActionType.DELETE_CARD,
    id,
  };
}

export function startDeleteCard(id: string) {
  return (dispatch: Dispatch) =>
    axios
      .delete(`http://localhost:3700/cards/${id}`)
      .then((res) => {
        if (res.data.id) {
          dispatch(deleteCard(res.data.id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
}
