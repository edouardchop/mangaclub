exports.up = function (knex) {
  return knex.schema.createTable('mangas', function (table) {
    table.increments( 'id' ).primary();
    table.string( 'name' ).notNullable();
    table.timestamps( true, true ); 
    table.integer("rate")
 
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('mangas');
};
