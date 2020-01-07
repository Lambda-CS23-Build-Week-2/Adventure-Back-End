// Update with your config settings.

const localPg = {
    host: 'localhost',
    database: 'blah',
    user: 'blah',
    password: 'blah'
  }
  const productionDbConnection = process.env.DATABASE_URL || localPg;
  
  module.exports = {
  
    development: {
        client: 'pg',
        connection: productionDbConnection,
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        },
        useNullAsDefault: true,
      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        }
      }
    },
  
    production: {
      client: 'pg',
      connection: productionDbConnection, // could be obj or str
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      },
    }
  
  };
  