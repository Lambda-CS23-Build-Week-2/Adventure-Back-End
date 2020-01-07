
exports.up = function(knex) {
  return knex.schema.table('rooms', t => {
    t.string('title', 500)
  })
};

exports.down = function(knex) {
  return knex.schema.table('rooms', t => {
    t.dropColumn('title')
  })
};
