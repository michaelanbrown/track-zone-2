class CreateRaces < ActiveRecord::Migration[6.1]
  def change
    create_table :races do |t|
      t.string :name
      t.integer :year
      t.integer :user_id
      t.integer :length_id

      t.timestamps
    end

    add_foreign_key :races, :users, column: :user_id
    add_index :races, :user_id

    add_foreign_key :races, :races, column: :length_id
    add_index :races, :length_id

  end
end
