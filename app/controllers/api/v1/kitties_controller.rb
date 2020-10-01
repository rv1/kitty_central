module Api::V1
  class KittiesController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      kitties = Kitty.all
      render json: KittySerializer.new(kitties, options).serialized_json
    end

    def show
      kitty = Kitty.find_by(slug: params[:slug])
      render json: KittySerializer.new(kitty, options).serialized_json
    end

    def create
      kitty = Kitty.new(kitty_params)

      if kitty.save
        render json: KittySerializer.new(kitty).serialized_json
      else
        render json: { error: kitty.errors.messages }, status: 422
      end
    end

    def update
      kitty = Kitty.find_by(slug: params[:slug])

      if kitty.update(kitty_params)
        render json: KittySerializer.new(kitty, options).serialized_json
      else
        render json: { error: kitty.errors.messages }, status: 422
      end
    end

    def destroy
      kitty = Kitty.find_by(slug: params[:slug])

      if kitty.destroy
        head :no_content
      else
        render json: { error: kitty.errors.messages }, status: 422
      end
    end

    private

    def kitty_params
      params.require(:kitty).permit(:name, :image_url)
    end

    def options
      @options ||= { include: %i[reviews] }
    end

  end
end
