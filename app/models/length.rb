class Length < ApplicationRecord
    has_many :races
    has_many :users, through: :races

    validates :distance, numericality: { greater_than: 0 }
    validates :measurement, presence: true, inclusion: { in: %w(km mi m) }
end