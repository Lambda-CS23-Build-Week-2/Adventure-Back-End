// Update with your config settings.
const localPg = {
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    user: 'dhamano',
    password: 'password'
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
            directory: './db/seeds'
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
  