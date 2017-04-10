const User = require('../../models/user.js');

describe('CREATE', () => {

	it('should create a user', done => {
		let user = {username: faker.internet.userName(), password: faker.internet.password()}

		User.forge(user).save()
			.then(user => {
				expect(user).to.not.equal(null);
				expect(typeof user.attributes.username).to.equal('string')
				done();
			}).catch(err => done(err));
	})

	it('should not allow creation of a user with a blank username', done => {
		let badUser = {username: '', password: faker.internet.password()}

		User.forge(badUser).save()
			.then(user => {
				expect(user).to.equal(null);
				done();
			}).catch(err => {
				console.log(err);
				expect(err).to.not.equal(null);
				done();
			})
	})	
});