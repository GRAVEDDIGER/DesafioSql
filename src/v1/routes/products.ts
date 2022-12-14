/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { Router } from 'express'
import { ProductsController } from '../../controllers/products.controller'

export const route = Router()

route.get('/', /* async (req, res) => await */ProductsController.getAllProducts/* (req, res) */)
route.post('/', express.json(), ProductsController.addProduct)
