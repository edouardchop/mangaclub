exports.up = function(knex) {
  return knex.schema.createTable('mangas', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable(); // Colonne description
    table.integer('userId').unsigned().notNullable()
         .references('id').inTable('users').onDelete('CASCADE'); // Colonne userId
    table.string('source');
    table.integer('rate');
    table.timestamps(true, true); // created_at et updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mangas');
};
