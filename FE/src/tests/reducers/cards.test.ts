import cardReducer from '../../state/reducers/cardReducer';
import cards from '../fixtures/cards';
import { CardActionType } from '../../state/actionTypes';
import { CardAction } from '../../state/actions';
import { Card } from '../../shared';

describe('REDUCER - SET_CARDS functionality', () => {
  test('should set cards as new state', () => {
    const action: CardAction = {
      type: CardActionType.SET_CARDS,
      cards,
    };
    const state = cardReducer([], action);
    expect(state).toEqual(cards);
  });
});

// DELETING CARDS

describe('REDUCER - DELETE_CARD functionality', () => {
  test('should remove card by ID', () => {
    const action: CardAction = {
      type: CardActionType.DELETE_CARD,
      id: cards[1].id,
    };
    const state = cardReducer(cards, action);
    expect(state).toEqual([cards[0], cards[2]]);
  });

  test('should not remove card if ID not found', () => {
    const action: CardAction = {
      type: CardActionType.DELETE_CARD,
      id: 'cards',
    };
    const state = cardReducer(cards, action);
    expect(state).toEqual(cards);
  });
});

// UPDATING CARDS

describe('REDUCER - UPDATE_CARD functionality', () => {
  test('should update card by ID', () => {
    const updates = {
      firstName: 'Cindy',
      lastName: 'Crawford',
      cardSpec: { colour: 'Crimson', logo: 'squares', theme: 'diagonal lines' },
    };
    const action: CardAction = {
      type: CardActionType.UPDATE_CARD,
      id: cards[1].id,
      updates,
    };
    const state = cardReducer(cards, action);
    const updatedCard = { ...cards[1], ...updates };
    expect(state).toEqual([cards[0], updatedCard, cards[2]]);
  });
});

// ADDING CARDS

describe('REDUCER - ADD_CARD functionality', () => {
  test('should add a new card with correct fields', () => {
    const newCard: Card = {
      firstName: 'Michael',
      lastName: 'Jordan',
      mobile: '+1 124 123 122',
      website: 'bulls.com',
      email: 'mjforpresident.com',
      cardSpec: {
        colour: 'Red',
        logo: 'bull',
        theme: 'winning',
      },
    };
    const action: CardAction = {
      type: CardActionType.ADD_CARD,
      cards: newCard,
    };
    const state = cardReducer([], action);
    expect(state).toEqual([newCard]);
  });
});
