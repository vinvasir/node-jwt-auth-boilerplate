const expect = require('chai').expect;
const request = require('supertest');

const dbConfig = require('../knexfile.js');
const knex = require('knex')(dbConfig.test);

const Post = require('../models/post.js');

beforeEach(done => {
	knex.migrate.rollback()
		.then(() => {
			knex.migrate.latest()
			.then(() => {
				done();
			})
		}).catch(err => done(err))
	// done();
});

describe('Post #create', () => {
	it('should create a post', done => {
		let post = {title: 'first post', body: 'nothing much'}

		Post.forge(post).save()
			.then(post => {
				expect(post.attributes.title).to.equal('first post');
				done();
			})
			.catch(e => done(e));
	});
});