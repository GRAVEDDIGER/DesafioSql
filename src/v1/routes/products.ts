/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { Router, Request, Response } from 'express'
import { dbManager } from '../../controllers/products.database'
import { DataResponse, Products } from '../../types'
const colors = require('colors')
export const route = Router()
route.get('/', async (_req: Request, res: Response): Promise<any> => {
  const data = await dbManager.getAll()

  if (data.status === 200) {
    res.render('home', { contenido: true, products: data.data })
  } else {
    res.render('home', { contenido: false, products: data.data })
  }

  // res.render('home', { contenido: true, products: [{ title: 'Adrian', url: 'daniel', price: 12 }, { title: 'Adrian', url: 'daniel', price: 12 }] })
})

route.post('/', express.json(), async (req: Request, _res: Response) => {
  const data1: Products = req.body
  const data = JSON.parse(Object.keys(data1)[0])
  console.log(colors.blue(data), colors.yellow('body'), colors.red(typeof data))
  const response: DataResponse = await dbManager.addProduct(data)
  console.log(colors.red(response))
})
