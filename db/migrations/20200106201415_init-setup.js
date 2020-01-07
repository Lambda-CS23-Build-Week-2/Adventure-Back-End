
exports.up = function(knex) {
    return knex.schema.createTable('rooms', t => {
      t.increments();
      t.integer('room_id')
        .notNullable()
        .unique()
      t.string('type', 255)
    })
    .createTable('directions', t => {
          t.increments()
          t.integer('room_id')
            .notNullable()
            .unsigned()
            .references('room_id')
            .inTable('rooms')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
          t.integer('north')
            .defaultTo(-2)
          t.integer('south')
            .defaultTo(-2)
          t.integer('east')
            .defaultTo(-2)
          t.integer('west')
            .defaultTo(-2)
      })       
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rooms')
  .dropTableIfExists('directions');
};
