const env = process.env.NODE_ENV || 'development';
console.log('env ***', env);

const dbConfig = require('../knexfile.js');
const knex = require('knex')(dbConfig[env]);

exports.knexInstance = knex;

module.exports = require('bookshelf')(knex);