class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :photo, :username, :email, :password_digest

  has_many :races
  has_many :lengths
end
