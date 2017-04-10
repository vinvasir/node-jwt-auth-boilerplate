// Update with your config settings.

module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      user:     'postgres',
      password: 'password',      
      database: 'auth_test'
    },
    pool: {
      min:2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      user:     'postgres',
      password: 'password',
      database: 'auth',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  },
};