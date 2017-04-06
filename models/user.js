const bookshelf = require('../config/bookshelf-instance');
bookshelf.plugin('registry');
const Bluebird = require('bluebird');
const bcrypt = Bluebird.promisifyAll(require('bcryptjs'));
const Role = require('./role');
const securityConfig = require('../config/security-config');

const Post = require('./post');

module.exports = bookshelf.model('User', {
	tableName: 'users',
	roles() {
		return this.belongsToMany(Role, 'user_role');
	},
	posts() {
		return this.hasMany('Post');
	},
	validPassword(password) {
		return bcrypt.compareAsync(password, this.attributes.password)
	},
	initialize: function() {
    this.on('saving', model => {
        if (!model.hasChanged('password')) return;

        return Bluebird.coroutine(function* () {
            const salt = yield bcrypt.genSaltAsync(securityConfig.saltRounds);
            const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt);
            model.set('password', hashedPassword);
        })();
    });
	}
});