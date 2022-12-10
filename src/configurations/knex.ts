import { Knex } from 'knex'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const database: Knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'coderhouse'
  },
  pool: { min: 0, max: 7 }
})
