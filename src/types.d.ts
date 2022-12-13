
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
