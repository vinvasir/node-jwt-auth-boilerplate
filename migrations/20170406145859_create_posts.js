
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', tbl => {
  	tbl.increments('id').primary();
  	tbl.integer('user_id')
  		 .references('id')
  		 .inTable('users');
  	tbl.string('title');
  	tbl.text('body');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
