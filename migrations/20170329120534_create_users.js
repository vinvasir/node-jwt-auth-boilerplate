
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
  	tbl.increments('id').primary();
  	tbl.string('username').notNullable().unique();
  	tbl.string('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
