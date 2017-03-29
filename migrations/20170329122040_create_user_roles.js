
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_role', tbl => {
  	tbl.integer('role_id')
  		 .references('id')
  		 .inTable('role');
  	tbl.integer('user_id')
  		 .references('id')
  		 .inTable('users');
  	tbl.primary(['role_id', 'user_id'])
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_role');
};
