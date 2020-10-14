import consumer from "./consumer"

consumer.subscriptions.create("ReviewsChannel", {
  connected() {
    console.log("Subscribed to ReviewsChannel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)
  }
});
