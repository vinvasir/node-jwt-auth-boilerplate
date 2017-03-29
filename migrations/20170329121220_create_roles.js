
exports.up = function(knex, Promise) {
  return knex.schema.createTable('role', tbl => {
  	tbl.increments('id').primary();
  	tbl.string('authority').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('role');
};
