class CreateKitties < ActiveRecord::Migration[6.0]
  def change
    create_table :kitties do |t|
      t.string :name
      t.string :image_url
      t.string :slug

      t.timestamps
    end
  end
end
