class Race < ApplicationRecord
  belongs_to :user
  belongs_to :length

  validates :name, presence: true
  validates :year, presence: true, numericality: { greater_than: 0 }
  validates :duration, presence: true, format: {with: /\A(?!00:00:00)[0-5][0-9]:[0-5][0-9]:[0-5][0-9]\Z/}
  validates :user_id, presence: true
  validates :length_id, presence: true
end