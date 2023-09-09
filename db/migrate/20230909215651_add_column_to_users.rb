class AddColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :likes, :text, array: true, default: []
  end
end
