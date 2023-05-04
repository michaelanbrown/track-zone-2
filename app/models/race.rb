class Race < ApplicationRecord
  belongs_to :user
  belongs_to :length

  validates :name, presence: true
  validates :year, presence: true, numericality: { greater_than: 0 }
  validates :user_id, presence: true
  validates :length_id, presence: true
end