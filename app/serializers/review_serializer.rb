class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :kitty_id
end
