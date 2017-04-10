// const dbConfig = require('../../knexfile.js');
// const knex = require('knex')(dbConfig.test);

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

	it('should return the title and body of each post', done => {
		let postsList = [];

		Post.fetchAll()
			.then(posts => {
				postList = posts;
				done();
			});

		postsList.forEach(post => {
			expect(post.attributes.title).to.not.be(null);
			expect(post.attributes.body).to.not.be(null);
		});		
	});
});