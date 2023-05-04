class Length < ApplicationRecord
    has_many :races
    has_many :users, through: :races
end