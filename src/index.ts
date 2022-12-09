/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { Request, Response } from 'express'
// import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { route } from './v1/routes/products'
const colors =require("colors")
const PORT = process.env.PORT ?? 8080
const app = express()
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use('/', route)
app.get('/', (_req: Request, res: Response) => {
  res.render('home')
})
const server = app.listen(PORT, () => {
  console.log(`Server conected on port ${PORT}`)
})
app.use((req: Request, res: Response) => {
  res.status(400).send({ err: `The Route ${req.path} on method ${req.method} is not yet implemented` })
})
const io = require('socket.io')(server)
io.on('connection', () => console.log('conected'))
