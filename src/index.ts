/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { Request, Response } from 'express'
// import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { Socket } from 'socket.io/dist/socket'
import { Server } from 'socket.io'
import { route } from './v1/routes/products'
import { ChatObject } from './types'
const colors = require('colors')
const PORT = process.env.PORT ?? 8080
const app = express()
const server = require('http').createServer(app)
const io = new Server(server)
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
server.listen(PORT, () => {
  console.log(colors.blue('Server conected on port', PORT))
})
app.use((req: Request, res: Response) => {
  res.status(400).send({
    err: `The Route ${req.path} on method ${req.method} is not yet implemented`
  })
})
const chatArray: ChatObject[] = []
io.on('connection', (socket: Socket) => {
  console.log(colors.green('Web Sockets: Client Conected'))
  socket.emit('startChat', chatArray)
  socket.on('clientMessage', (message) => {
    console.log(colors.red('Mensaje recibido, enviando'))
    console.log(colors.yellow(message))
    chatArray.push(JSON.parse(message))
    io.emit('serverMessage', message)
  })
})
