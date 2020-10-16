import consumer from "./consumer"

consumer.subscriptions.create("KittyChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected to KittyChannel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("disconnected from KittyChannel")
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("received from KittyChannel")
    console.log(data)
  }
});
