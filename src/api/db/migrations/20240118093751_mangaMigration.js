exports.up = function (knex) {
  return knex.schema.createTable('mangas', function (table) {
    table.increments( 'id' ).primary();
    table.string( 'name' ).notNullable();
    table.timestamps( true, true ); 
    table.integer( "rate" )
    table.string('source')
 
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('mangas');
};
