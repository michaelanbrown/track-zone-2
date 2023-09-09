class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :create]

    def index 
        render json: User.all, status: :ok
    end

    def show
        render json: current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    def update
        @update_user = User.find(params[:id])
    end

    def user_search
        users = User.where("username LIKE ?", "%#{params[:search]}%") || User.where("name LIKE ?", "%#{params[:search]}%")
        if users.size > 0
            render json: users, status: :ok
        else
            render json: { errors: "No users found" }, status: :unprocessable_entity
        end
    end

    private 

    def user_params
        params.permit(:name, :age, :photo, :username, :email, :password)
    end

    def update_user_params
    end

end