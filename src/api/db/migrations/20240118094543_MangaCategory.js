exports.up = function (knex) {
  return knex.schema.createTable('MangaCategory', function (table) {
    table.increments('id').primary();
    table.integer('manga_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.foreign('manga_id').references('mangas.id').onDelete('CASCADE');
    table.foreign( 'category_id' ).references( 'categories.id' ).onDelete( 'CASCADE' );
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('MangaCategory');
};
