class RaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :year, :duration
  has_one :user
  has_one :length
end
