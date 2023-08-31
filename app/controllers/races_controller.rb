class RacesController < ApplicationController
    before_action :find_race, only: [:show, :update, :destroy]
    before_action :authorize_user, only: [:show, :update, :destroy]
    skip_before_action :authenticate_user, only: [:index, :users_with_year]

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
        @race.update!(update_race_params)
        render json: @race, status: :accepted
    end

    def destroy
        @race.destroy
        head :no_content 
    end

    def users_with_year
        races = Race.where("year > ?", params[:users_with_year])
        users = races.map{|r| r.user}
        if users.size > 0
            render json: users, status: :ok
        else
            render json: {error: "No users found"}, status: :not_found
        end
    end

    # Use the year to find all race results after that year.Then render back the users who are associated with those races. If no races are found render a message that says so.

    private

    def race_params
        params.permit(:name, :year, :length_id).merge(user_id: current_user.id)
    end
    
    def update_race_params
        params.permit(:name, :year, :duration)
    end

end