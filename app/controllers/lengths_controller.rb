class LengthsController < ApplicationController

    def index 
        render json: Length.all, status: :ok
    end

    def create
        length = Length.create!(length_params)
        render json: length, status: :created
    end

    private
    
    def length_params
        params.permit(:distance, :measurement)
    end 
end