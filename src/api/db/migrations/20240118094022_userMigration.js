exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments( 'id' ).primary();
    table.string( 'firstname' ).notNullable();
    table.string('lastname').notNullable();
    table.string('username').notNullable();
    table.string( 'email' ).notNullable().unique();
    table.string( 'password' ).notNullable();
    table.enu('role', ["user", "admin", "superadmin"]).defaultTo("user", options={})
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
