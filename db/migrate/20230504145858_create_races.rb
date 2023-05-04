class CreateRaces < ActiveRecord::Migration[6.1]
  def change
    create_table :races do |t|
      t.string :name
      t.integer :year
      t.references :user, null: false, foreign_key: true
      t.references :length, null: false, foreign_key: true

      t.timestamps
    end
  end
end
