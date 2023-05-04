class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :photo, :username, :email, :password_digest
end
