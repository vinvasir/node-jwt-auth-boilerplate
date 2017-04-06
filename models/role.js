const bookshelf = require('../config/bookshelf-instance');
const User = require('./user');
bookshelf.plugin('registry');

module.exports = bookshelf.model('Role', {
	tableName: 'role',
	users() {
		return this.belongsToMany('User', 'user_role');
	}
});