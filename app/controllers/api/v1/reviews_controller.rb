module Api::V1
  class ReviewsController < ApplicationController
    protect_from_forgery with: :null_session

    def create
      review = kitty.reviews.new(review_params)
      if review.save
        json = ReviewSerializer.new(review).serialized_json
        render json: json
      else
        render json: { error: review.errors.messages }, status: 422
      end
    end

    def destroy
      review = Review.find(params[:id])
      if review.destroy
        head :no_content
      else
        render json: { error: review.errors.messages }, status: 422
      end
    end

    private

    def kitty
      @kitty ||= Kitty.find(params[:kitty_id])
    end

    def review_params
      params.require(:review).permit(:title, :description, :score, :kitty_id)
    end
  end
end