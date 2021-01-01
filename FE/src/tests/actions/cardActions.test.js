import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/cardActions'
import cards from '../fixtures/cards'
import mockAxios from 'axios'

const createMockStore = configureMockStore([thunk])

describe('Card Actions. Synchronous', () => {
  test('should create an actino to add a card', () => {
    const card = cards[0]
    expect(actions.addCard(card)).toEqual({
      type: 'ADD_CARD',
      card
    })
  })
  test('should create an action to set cards', () => {
    expect(actions.setCards(cards)).toEqual({
      type: 'SET_CARDS',
      cards
    })
  })
  test('should create an action to update a card', () => {
    const id = cards[0].id
    const updateKeyValuesNoId = Object.entries(cards[0]).filter(([key, value]) => key !== 'id')
    const updates = Object.fromEntries(updateKeyValuesNoId)
    expect(actions.updateCard(id, updates)).toEqual({
      type: 'UPDATE_CARD',
      id,
      updates: {
        firstName: 'Steve',
        lastName: 'Jobs',
        mobile: '+1 890 124 2321',
        website: 'apple.com',
        email: 'sj@apple.com',
        cardSpec: {
          colour: 'Aqua',
          logo: 'triangles',
          theme: 'diagonal lines'
        }
      },
    })
  })
  test('should create an action to delete card by ID', () => {
    expect(actions.deleteCard(cards[2].id)).toEqual({
      type: 'DELETE_CARD',
      id: cards[2].id
    })
  })
})

/*
https://jestjs.io/docs/en/mock-functions
Mock functions allow you to test the links between code by erasing the actual implementation of
a function, capturing calls to the function

There are two ways to mock functions: Either by creating a mock function to use in test code,
or writing a manual mock to override a module dependency.
*/

describe('Card Actions. Asynchronous', () => {
  test('should add card to database and dispatch ADD_CARD action', async () => {
    const store = createMockStore({})
    const card = cards[0]
    const mockData = {
      ...card,
      timestamp: {
        _nanoseconds: 5000000,
        _seconds: 1651806515,
      }
    }
    mockAxios.post.mockResolvedValue({ res: mockData })
    
    const expectedActions = [
      { type: 'ADD_CARD', mockData }
    ]
    await store.dispatch(actions.startAddCard(card))
    expect(store.getActions()).toEqual(expectedActions)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
  })
})