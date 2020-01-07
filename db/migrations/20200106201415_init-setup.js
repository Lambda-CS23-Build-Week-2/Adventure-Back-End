
exports.up = function(knex) {
    return knex.schema.createTable('directions', t => {
          t.increments()
          t.integer('room_id')
            .notNullable()
          t.integer('north')
            .defaultTo(-2)
          t.integer('south')
            .defaultTo(-2)
          t.integer('east')
            .defaultTo(-2)
          t.integer('west')
            .defaultTo(-2)
      })
        .createTable('rooms', t => {
          t.increments();
          t.integer('room_id')
            .notNullable()
            .unique()
          t.string('type', 255)
          t.integer('exits')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('directions')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('directions')
  .dropTableIfExists('rooms');
};
