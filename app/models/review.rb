class Review < ApplicationRecord
  belongs_to :kitty

  after_commit :broadcast_review

  private

  def broadcast_review
    json = ReviewSerializer.new(self).serialized_json
    # Approach 1
    # KittyChannel.broadcast_to self.kitty, content: json

    # Approach 2
    ActionCable.server.broadcast "kitty_#{self.kitty.slug}_channel", content: json
  end
end
