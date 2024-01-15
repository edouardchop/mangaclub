exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments( 'id' ).primary();
    table.string( 'name' ).notNullable();
    table.string('surname').notNullable();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
