class LengthSerializer < ActiveModel::Serializer
  attributes :id, :distance, :measurement

  has_many :races
end
