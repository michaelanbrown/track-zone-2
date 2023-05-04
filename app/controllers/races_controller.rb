class RacesController < ApplicationController

    def index 
        render json: Race.all, status: :ok
    end

    def create
        race = Race.create!(race_params)
        render json: race, status: :created
    end

    private
    
    def race_params
        params.permit(:name, :year, :user_id, :length_id)
    end 
end