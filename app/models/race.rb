class Race < ApplicationRecord
  belongs_to :user
  belongs_to :length
end
