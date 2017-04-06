const bookshelf = require('../config/bookshelf-instance');
bookshelf.plugin('registry');
const User = require('./user');

module.exports = bookshelf.model('Post', {
	tableName: 'posts',
	user() {
		return this.belongsTo('User');
	}
});