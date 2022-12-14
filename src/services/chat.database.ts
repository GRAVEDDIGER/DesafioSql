import { Knex } from 'knex'
import { ChatDataResponse, Chat, DbManagerType } from '../types'
import { Database } from '../configurations/knex'
export class DbManager implements DbManagerType {
  database: Knex
  constructor (database: Knex) {
    this.database = database
  }

  async isTable (table: string): Promise<void> {
    if (!await this.database.schema.hasTable(table)) await this.createChatTable(table)
  }

  async createChatTable (table: string): Promise<any> {
    return await this.database.schema.createTable(table, table => {
      table.increments('id')
      table.string('MESSAGE')
      table.string('USER')
      table.integer('TIMESTAMP')
    }).then(() => { return true }).catch(e => { return { e } })
  }

  async getAll (): Promise<ChatDataResponse> {
    let response: ChatDataResponse
    await this.isTable('chat')
    try {
      const data = await this.database.select('*').from('chat')
      response = { data, status: 200, err: '', textStatus: 'Chat history retrived succesifully' }
    } catch (err: any) {
      response = { data: [], status: 400, err, textStatus: 'Failed to retrieve chat Histroy' }
    }
    return response
  }

  async getById (id: number): Promise<ChatDataResponse> {
    let response: ChatDataResponse
    await this.isTable('chat')

    try {
      const data: any = await this.database.select('*').from('chat').where('id', '=', id)
      if (data.length === 0) throw new Error('The id doesnt Exist')
      response = { data: [{ ...data[0] }], status: 200, err: '', textStatus: 'Product retrived succesifully' }
    } catch (err: any) {
      response = { data: [{ USER: '', MESSAGE: '', TIMESTAMP: '' }], status: 400, err: err.toString(), textStatus: 'Unable to retrive data' }
    }
    return response
  }

  async addProduct (item: Chat): Promise<ChatDataResponse> {
    let response: ChatDataResponse
    await this.isTable('chat')

    try {
      const data = await this.database.insert({ USER: item.USER, MESSAGE: item.MESSAGE, TIMESTAMP: item.TIMESTAMP }).into('chat')
      response = { data: [{ ...item, id: data[0] }], status: 200, err: '', textStatus: 'Product added succesifully' }
    } catch (err: any) {
      response = { data: [{ ...item, id: -1 }], status: 400, err, textStatus: 'Failed to add product' }
    }
    return response
  }
}
export const dbManager = new DbManager(new Database('coderhouse').database)

export default dbManager
