import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'

import { createGameState } from './controllers/state'

import { createHandlers } from './handlers'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3000

const gameState = createGameState()

io.on('connection', (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`)

  createHandlers(socket, io, gameState)
})

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
