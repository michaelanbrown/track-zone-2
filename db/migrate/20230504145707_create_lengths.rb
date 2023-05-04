class CreateLengths < ActiveRecord::Migration[6.1]
  def change
    create_table :lengths do |t|
      t.integer :distance
      t.string :measurement

      t.timestamps
    end
  end
end
