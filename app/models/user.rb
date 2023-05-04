class User < ApplicationRecord
    has_many :races
    has_many :lengths, through: :races

    validates :name, presence: true
    validates :age, numericality: { greater_than_or_equal_to: 13 }
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true

    has_secure_password
end