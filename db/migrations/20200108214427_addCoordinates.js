
exports.up = function(knex) {
    return knex.schema.table('rooms', t => {
      t.text('description')
      t.string('coordinates', 255)
      t.string('terrain', 255)
      t.integer('elevation')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('rooms', t => {
      t.dropColumn('description')
      t.dropColumn('coordinates')
      t.dropColumn('terrain')
      t.dropColumn('elevation')
    })
  };
  