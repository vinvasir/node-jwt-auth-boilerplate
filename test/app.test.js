global.expect = require('chai').expect;
global.request = require('supertest');
global.faker = require('faker');

const dbConfig = require('../knexfile.js');
const knex = require('knex')(dbConfig.test);

beforeEach(done => {
	knex.migrate.rollback()
		.then(() => {
			knex.migrate.latest()
			.then(() => {
				done();
			})
		}).catch(err => done(err))
});