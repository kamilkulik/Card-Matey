import cardReducer from '../../state/reducers/cardReducer';
import cards from '../fixtures/cards';

// DEFAULT STATE

describe('REDUCER - correctly initiates state', () => {
  test('should set default state', () => {
    const state = cardReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
  });
});

describe('REDUCER - SET_CARDS functionality', () => {
  test('should set cards as new state', () => {
    const action = {
      type: 'SET_CARDS',
      cards,
    };
    const state = cardReducer([], action);
    expect(state).toEqual(cards);
  });
});

// DELETING CARDS

describe('REDUCER - DELETE_CARD functionality', () => {
  test('should remove card by ID', () => {
    const action = {
      type: 'DELETE_CARD',
      id: cards[1].id,
    };
    const state = cardReducer(cards, action);
    expect(state).toEqual([cards[0], cards[2]]);
  });

  test('should not remove card if ID not found', () => {
    const action = {
      type: 'DELETE_CARD',
      id: 'cards',
    };
    const state = cardReducer(cards, action);
    expect(state).toEqual(cards);
  });
});

// UPDATING CARDS

describe('REDUCER - UPDATE_CARD functionality', () => {
  test('should update card by ID', () => {
    const updates = { firstName: 'Cindy', lastName: 'Crawford', cardSpec: { colour: 'Crimson', logo: 'squares', theme: 'diagonal lines' } };
    const action = {
      type: 'UPDATE_CARD',
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
    const newCard = {
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
    const action = {
      type: 'ADD_CARD',
      card: newCard,
    };
    const state = cardReducer([], action);
    expect(state).toEqual([newCard]);
  });
});
