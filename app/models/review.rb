class Review < ApplicationRecord
  belongs_to :kitty

  after_commit :broadcast_review

  private

  def broadcast_review
    json = ReviewSerializer.new(self).serialized_json
    ActionCable.server.broadcast 'reviews_channel', content: json
  end
end
