/* eslint-disable n/no-path-concat */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Knex } from 'knex'

export class Database {
  public database: Knex
  constructor (file: string) {
    this.database = require('knex')({
      client: 'sqlite3',
      connection: { filename: `./src/database/${file}.sqlite3` },
      useNullAsDefault: true

    })
  }
}
