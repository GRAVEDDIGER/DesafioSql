import { Request, Response } from 'express'
import manager from '../services/products.database'
import { Products } from '../types'
import colors from 'colors'
export class DataController {
  async getAllProducts (_req: Request, res: Response): Promise<any> {
    manager.getAll().then(response => {
      if (response.status === 200) res.render('home', { contenido: true, products: response.data })
      else res.render('home', { contenido: false, products: response.data })
    }).catch((err) => res.render('home', { contenido: false, products: err }))
  }

  async addProduct (req: Request, res: Response): Promise<void> {
    const data: Products = req.body
    console.log(req.body)
    console.log(colors.blue(JSON.stringify(data)), colors.yellow('body'), colors.red(typeof data))
    manager.addProduct(data).then(() => res.redirect('/')).catch(e => console.log(e))
  }
}

export const ProductsController = new DataController()
