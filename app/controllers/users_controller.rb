class UsersController < ApplicationController
    has_many :races
    has_many :lengths, through: :races
end