class ApplicationController < ActionController::API
  # before_action :authenticate_user

  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  private

  def authenticate_user
    render json: { errors: {User: " Not Authorized"}}, status: :unauthorized unless current_user
  end

  def find_race
    @race = Race.find(params[:id])
  end

  def authorize_user
    permitted = @race.user_id == current_user.id
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { error: "Record not found" }, status: :not_found
  end

end