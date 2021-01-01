import cardReducer from '../../reducers/cardReducer'
import cards from '../fixtures/cards'

test('should set default state', () => {
  const state = cardReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove card by ID', () => {
  const action = {
    type: 'DELETE_CARD',
    id: cards[1].id
  };
  const state = cardReducer(cards, action);
  expect(state).toEqual([cards[0], cards[2]]);
});

test('should update card by ID', () => {
  const updates = { firstName: 'Cindy', lastName: 'Crawford', cardSpec: { colour: 'Crimson', logo: 'squares', theme: 'diagonal lines' }}
  const action = {
    type: 'UPDATE_CARD',
    id: cards[1].id,
    updates
  };
  const state = cardReducer(cards, action);
  const updatedCard = { ...cards[1], ...updates}
  expect(state).toEqual([cards[0], updatedCard, cards[2]]);
})