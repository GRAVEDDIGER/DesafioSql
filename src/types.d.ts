import { Knex } from 'knex'

export interface ChatObject {
  user: string
  message: string
  timeStamp: number
}

export interface Products {
  id?: number
  TITLE: string
  URL: string
  PRICE: number
}

export interface DataResponse {
  data: Products[]
  err: string
  status: number
  textStatus: string
}

export interface Chat {
  id?: number
  USER: string
  MESSAGE: string
  TIMESTAMP: string
}
export interface ChatDataResponse extends Omit<DataResponse, 'data'> {
  data: Chat[]
}

export interface DbManagerType {
  database: Knex
  isTable: (table: string) => Promise<any>
  createProductsTable?: (table: string) => Promise<any>
  createChatTable?: (table: string) => Promise<any>
  getAll: () => Promise<DataResponse | ChatDataResponse>
  getById: (id: number) => Promise<DataResponse | ChatDataResponse>
  addProduct: (item: extends <Products | Chat>) => Promise<DataResponse | ChatDataResponse>

}
