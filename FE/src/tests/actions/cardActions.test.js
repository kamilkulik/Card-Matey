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

  let store
  beforeEach(() => {
    store = createMockStore({})
  })
  
  test('should add card to database and dispatch ADD_CARD action', async () => {
    const card = cards[0]
    const mockData = {
      ...card,
      timestamp: {
        _nanoseconds: 5000000,
        _seconds: 1651806515,
      }
    }
    mockAxios.post.mockResolvedValue({ data: mockData, status: 200 })
    const expectedActions = [
      { type: 'ADD_CARD', card: mockData }
    ]
    await store.dispatch(actions.startAddCard(card))
    expect(store.getActions()).toEqual(expectedActions)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
  })

  test('should get all cards from the database and dispatch SET_CARDS action', async () => {
    mockAxios.get.mockResolvedValue({ data: cards })
    const expectedActions = [
      { type: 'SET_CARDS', cards }
    ]
    await store.dispatch(actions.startSetCards())
    expect(store.getActions()).toEqual(expectedActions)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })

  test('should update card in database and dispatch UPDATE_CARD action', async () => {
    const card = cards[0]
    const mockData = {
      ...card,
      timestamp: {
        _nanoseconds: 5000000,
        _seconds: 1651806515,
      }
    }
    mockAxios.patch.mockResolvedValue({ data: mockData})
    const expectedActions = [
      { 
        type: 'UPDATE_CARD', 
        id: cards[0].id,
        updates: mockData,
      }
    ]
    await store.dispatch(actions.startUpdateCard(mockData))
    expect(store.getActions()).toEqual(expectedActions)
    expect(mockAxios.patch).toHaveBeenCalledTimes(1)
  })

  test('should delete card from database and dispatch DELETE_CARD action', async () => {
    const card = cards[0]
    const mockId = card.id
    mockAxios.delete.mockResolvedValue({ data: { id: mockId }})
    const expectedActions = [
      { 
        type: 'DELETE_CARD', 
        id: mockId
      }
    ]
    await store.dispatch(actions.startDeleteCard(mockId))
    expect(store.getActions()).toEqual(expectedActions)
    expect(mockAxios.delete).toHaveBeenCalledTimes(1)
  })
})
