class KittyChannel < ApplicationCable::Channel
  def subscribed
    slug = params[:slug]
    # Approach 1
    # kitty = Kitty.find_by_slug slug
    # stream_for kitty

    # Approach 2
    stream_from "kitty_#{slug}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
