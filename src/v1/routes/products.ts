
import { Router, Request, Response } from 'express'
export const route = Router()
route.get('/', (_req: Request, res: Response) => {
  res.render('home', { contenido: true, products: [{ title: 'Adrian', url: 'daniel', price: 12 }, { title: 'Adrian', url: 'daniel', price: 12 }] })
})
