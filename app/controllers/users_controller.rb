class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :create, :update]

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
        @update_user.update!(likes: params[:likes])
        render json: @update_user, status: :accepted
    end

    def user_search
        users = User.where("username ILIKE ? or name ILIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
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

end