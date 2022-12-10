import { Knex } from 'knex'
import { DataResponse, Products } from '../types'
import { database } from '../configurations/knex'

export class DbManager {
  private readonly database: Knex
  constructor (database: Knex) {
    this.database = database
  }
///////////////////////
//trabajando en getAll
  async getAll (): Promise<any[]> {
    let response: any
    try {
      const data = await this.database.select('*').from('products')
      response = { data: { ...data }, status: 200, err: '', textStatus: 'Product retrived succesifully' }
    } catch (err) {

    }
  }

  async getById (id: number): Promise<DataResponse> {
    let response: DataResponse
    try {
      const data: any = await this.database.select('*').from('products').where('id', '=', id)
      response = { data: { ...data[0] }, status: 200, err: '', textStatus: 'Product retrived succesifully' }
    } catch (err: any) {
      response = { data: { TITLE: '', URL: '', PRICE: -1 }, status: 400, err: err.toString(), textStatus: 'Unable to retrive data' }
    }
    return response
  }

  async addProduct (item: Products): Promise<DataResponse> {
    let response: DataResponse
    try {
      const data = await this.database.insert({ TITLE: item.TITLE, URL: item.URL, PRICE: item.PRICE }).into('products')
      response = { data: { ...item, id: data[0] }, status: 200, err: '', textStatus: 'Product added succesifully' }
    } catch (err: any) {
      response = { data: { ...item, id: -1 }, status: 400, err, textStatus: 'Failed to add product' }
    }
    return response
  }
}

export const dbManager = new DbManager(database)
dbManager.getAll().then(res => console.log(res)).catch(e => console.log(e))
dbManager.getById(7).then(res => console.log(res)).catch(e => console.log(e))
// dbManager.addProduct({ TITLE: 'ADrian', URL: 'El mas groso', PRICE: 33 }).then(res => console.log(res)).catch(e => console.log(e))
