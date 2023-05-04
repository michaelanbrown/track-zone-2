class RaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :year
  has_one :user_id
  has_one :length_id
end
