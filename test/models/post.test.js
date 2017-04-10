const Post = require('../../models/post.js');

describe('Post #create', () => {
	it('should create a post', done => {
		let post = {title: 'first post', body: 'nothing much'}

		Post.forge(post).save()
			.then(post => {
				expect(post.attributes.title).to.equal('first post');

				Post.fetchAll().then(posts => {
					expect(posts.length).to.equal(1);
					done();
				})
			})
			.catch(e => done(e));
	});

	it('should only allow strings as the title', done => {
		let badPost = {title: 35, body: faker.lorem.paragraph()}

		Post.forge(badPost).save().then(() => {
			done()
		}).catch(() => done());

		Post.forge(badPost).fetch()
			.then(post => {
				expect(post).to.equal(null);
			})
	})

	it('should only allow text as the body', done => {
		let badPost = {title: 'cool title', body: 463.1}

		Post.forge(badPost).save().then(() => {
			done()
		}).catch(() => done());

		Post.forge(badPost).fetch()
			.then(post => {
				expect(post).to.equal(null);
			})
	})
});

describe('Post #all', () => {
	beforeEach(done => {
		var promises = [];

		for(let i=0, l=5; i < l; i++) {
			promises.push(
				Post.forge({
					title: faker.lorem.word(),
					body: faker.lorem.paragraph()
				}).save()
			);
		}

	  Promise.all(promises).then(values => {
			 done();
		}).catch(err => done(err));
	});

	it('should return all posts', done => {
		Post.fetchAll()
			.then(posts => {
				expect(posts.length).to.equal(5);
				done();
			});
	});
});