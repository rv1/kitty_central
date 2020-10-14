import React from 'react'
import axios from 'axios'
import consumer from "../channels/consumer"

const initialState = { kitties: [] }
function kittyReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CURRENT_KITTY':
      return { ...state, currentKitty: { loading: true } }
    case 'SET_CURRENT_KITTY':
      return { ...state, currentKitty: action.payload }
    case 'SET_KITTIES':
      return { ...state, kitties: action.payload }
    case 'ADD_REVIEW':
      const newState = { ...state }
      const { currentKitty, kitties } = state
      const review = action.payload;
      const reviewedKittyId = review.attributes.kitty_id
      const kittyIndex = kitties.findIndex(({ id }) => id === reviewedKittyId)

      // Update in kitties
      if (kittyIndex !== -1) {
        const kitty = kitties[kittyIndex]
        const newKitty = {
          ...kitty,
          'relationships.review.data': [
            ...kitty.relationships.review.data, review
          ]
        }
        newState.kitties = kitties.splice(kittyIndex, 1, newKitty)
      }

      // Add review to current kitty
      if (reviewedKittyId == currentKitty.data.id) {
        newState.currentKitty = {
          ...currentKitty,
          included: [...currentKitty.included, review]
        }
      }

      return newState
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

export function fetchKittyBySlug(dispatch, { slug }) {
  dispatch({ type: 'LOAD_CURRENT_KITTY' })
  
  const url = `/api/v1/kitties/${slug}`
    axios.get(url)
      .then(response => {
        dispatch({ type: 'SET_CURRENT_KITTY', payload: response.data })
      })
      .catch(response => console.error(response))
}

export function subscribeToKitties(dispatch) {
  // Reviews
  return consumer.subscriptions.create("ReviewsChannel", {
    connected() {
      console.log("Subscribed to ReviewsChannel!")
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
      alert('Unsubscribed from server!')
    },
  
    received(data) {
      const review = JSON.parse(data.content).data
      dispatch({ type: 'ADD_REVIEW', payload: review })
    }
  });
}

export function unsubscribeFromKitties(channel) {
  channel.unsubscribe()
}

export function KittyProvider({ children }) {
  const [state, dispatch] = React.useReducer(kittyReducer, initialState)
  return (
    <KittyStateContext.Provider value={state}>
      <KittyDispatchContext.Provider value={dispatch}>
        {children}
      </KittyDispatchContext.Provider>
    </KittyStateContext.Provider>
  )
}