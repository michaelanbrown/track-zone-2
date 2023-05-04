class Race < ApplicationRecord
  belongs_to :user_id
  belongs_to :length_id
end
