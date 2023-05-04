class LengthsController < ApplicationController

    def create
        length = Length.create!(length_params)
        render json: length, status: :created
    end

    private
    
    def length_params
        params.permit(:distance, :measurement)
    end 
end