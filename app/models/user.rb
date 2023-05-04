class User < ApplicationRecord
    has_many :races
    has_many :lengths, through: :races

    has_secure_password
end
