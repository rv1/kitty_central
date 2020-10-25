import React, { useContext, createContext, useReducer } from 'react'

export const ACTIONS = {
  START_LOADING: 'START_LOADING',
  FINISH_LOADING: 'FINISH_LOADING',
  SET_KITTIES: 'SET_KITTIES',
  SET_KITTY: 'SET_KITTY',
  SET_REVIEW: 'SET_REVIEW',
  POST_REVIEW: 'POST_REVIEW',
  ADD_REVIEW: 'ADD_REVIEW',
}

const initialState = {
  kitties: [],
  kitty: {},
  review: {
    title: '',
    description: '',
    score: 0,
  },
  loading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return { ...state, loading: true }
    case ACTIONS.FINISH_LOADING:
      return { ...state, loading: false }
    case ACTIONS.SET_KITTIES:
      return { ...state, kitties: action.payload }
    case ACTIONS.SET_KITTY:
      return { ...state, kitty: action.payload }
    case ACTIONS.SET_REVIEW:
      return { ...state, review: action.payload }
    case ACTIONS.POST_REVIEW:
      return { ...state, review: initialState.review }
    case ACTIONS.ADD_REVIEW:
      const newState = { ...state }
      newState.kitty = {
        ...state.kitty,
        included: [...state.kitty.included, action.payload],
      }
      return newState
    default:
      return state
  }
}

const KittyStateContext = createContext()
const KittyDispatchContext = createContext()

export function useKitty() {
  return [useContext(KittyStateContext), useContext(KittyDispatchContext)]
}

export const CatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <KittyStateContext.Provider value={state}>
      <KittyDispatchContext.Provider value={dispatch}>
        {children}
      </KittyDispatchContext.Provider>
    </KittyStateContext.Provider>
  )
}
