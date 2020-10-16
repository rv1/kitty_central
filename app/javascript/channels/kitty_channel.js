import consumer from "./consumer"
import { ACTIONS } from "../providers/cat_provider";

export const subscribeToKitty = (dispatch) => {
  return consumer.subscriptions.create("KittyChannel", {
    connected() {
      console.log("connected to KittyChannel")
    },

    disconnected() {
      console.log("disconnected from KittyChannel")
    },

    received(data) {
      console.log("received from KittyChannel")
      console.log(data)
      const review = JSON.parse(data.content).data
      dispatch({ type: ACTIONS.ADD_REVIEW, payload: review })
    }
  })
}

export function unsubscribeFromKitties(subscription) {
  consumer.subscriptions.remove(subscription)
}
