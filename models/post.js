const bookshelf = require('../config/bookshelf-instance');
const User = require('./user');

module.exports = bookshelf.Model.extend({
	tableName: 'posts',
	user() {
		return this.belongsTo(User);
	}
});