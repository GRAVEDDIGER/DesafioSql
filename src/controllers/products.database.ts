import { Knex } from 'knex'
import { DataResponse, Products } from '../types'
import { Database } from '../configurations/knex'
export class DbManager {
  private readonly database: Knex
  constructor (database: Knex) {
    this.database = database
  }

  async isTable (table: string): Promise<Boolean> {
    return (await this.database.schema.hasTable(table))
  }

  async createProductsTable (table: string): Promise<any> {
    return await this.database.schema.createTable(table, table => {
      table.increments('id')
      table.string('TITLE')
      table.string('URL')
      table.integer('PRICE')
    }).then(() => { return true }).catch(e => { return { e } })
  }

  async getAll (): Promise<DataResponse> {
    let response: DataResponse
    try {
      const data = await this.database.select('*').from('products')
      response = { data, status: 200, err: '', textStatus: 'Product retrived succesifully' }
    } catch (err) {
      response = { data: [], status: 200, err: '', textStatus: 'Product retrived succesifully' }
    }
    return response
  }

  async getById (id: number): Promise<DataResponse> {
    let response: DataResponse
    try {
      const data: any = await this.database.select('*').from('products').where('id', '=', id)
      if (data.length === 0) throw new Error('The id doesnt Exist')
      response = { data: [{ ...data[0] }], status: 200, err: '', textStatus: 'Product retrived succesifully' }
    } catch (err: any) {
      response = { data: [{ TITLE: '', URL: '', PRICE: -1 }], status: 400, err: err.toString(), textStatus: 'Unable to retrive data' }
    }
    return response
  }

  async addProduct (item: Products): Promise<DataResponse> {
    let response: DataResponse
    if (await this.isTable('products') === false) {
      await this.createProductsTable('products')
    }
    try {
      const data = await this.database.insert({ TITLE: item.TITLE, URL: item.URL, PRICE: item.PRICE }).into('products')
      response = { data: [{ ...item, id: data[0] }], status: 200, err: '', textStatus: 'Product added succesifully' }
    } catch (err: any) {
      response = { data: [{ ...item, id: -1 }], status: 400, err, textStatus: 'Failed to add product' }
    }
    return response
  }
}
export const dbManager = new DbManager(new Database('coderhouse').database)
export default dbManager
