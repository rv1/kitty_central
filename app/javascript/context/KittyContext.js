import React from 'react'
import axios from 'axios'

const initialKitties = []
function kittyReducer(state, action) {
  switch (action.type) {
    case 'SET_KITTIES':
      return action.payload
      break;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const KittyStateContext = React.createContext()
export const KittyDispatchContext = React.createContext()

export function fetchAllKitties(dispatch) {
  axios.get('/api/v1/kitties')
      .then(response => dispatch({ type: 'SET_KITTIES', payload: response.data.data }))
      .catch(err => console.error(err))
}

export function KittyProvider({ children }) {
  const [state, dispatch] = React.useReducer(kittyReducer, initialKitties)
  return (
    <KittyStateContext.Provider value={state}>
      <KittyDispatchContext.Provider value={dispatch}>
        {children}
      </KittyDispatchContext.Provider>
    </KittyStateContext.Provider>
  )
}