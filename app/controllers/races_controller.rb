class RacesController < ApplicationController

    def create
        race = Race.create!(race_params)
        render json: race, status: :created
    end

    private
    
    def race_params
        params.permit(:name, :year, :user_id, :length_id)
    end 
end