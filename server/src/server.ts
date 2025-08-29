import http from 'http'
import { Server, Socket } from 'socket.io'

import { createGameState } from './controllers/state.ts'

import { createHandlers } from './handlers.ts'
import { broadcastGameStateChange } from './controllers/broadcaster.ts'

const server = http.createServer()
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

  setTimeout(() => {
    socket.emit('set_player_id', { id: socket.id })
    broadcastGameStateChange(io, gameState)
  }, 100)

  createHandlers(socket, io, gameState)
})

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
