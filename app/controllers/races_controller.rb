class RacesController < ApplicationController
    before_action :find_race, only: [:show, :update, :destroy]

    def index 
        render json: Race.all, status: :ok
    end

    def show
        render json: @race, status: :ok
    end

    def create
        race = Race.create!(race_params)
        render json: race, status: :created
    end

    def update
        @race.update!(race_params)
        render json: @race, status: :accepted
    end

    def destroy
        @race.destroy
        head :no_content 
    end 

    private
    
    def race_params
        params.permit(:name, :year, :duration, :user_id, :length_id)
    end

    def find_race
        @race = Race.find(params[:id])
    end
end