import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'

import { createGameState } from './controllers/state'

import type { SubmitAnswer } from './types'
import { createHost, createPlayer, removePlayer } from './controllers/player'
import { restartGame } from './controllers/reset'
import { startGame } from './controllers/start'
import { submitAnswer } from './controllers/question'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3000

let questionTimer: NodeJS.Timeout | undefined = undefined

const gameState = createGameState()
let {
  settings: { categories },
  players,
} = gameState

io.on('connection', (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`)

  socket.on('send_username', (username: string) => {
    console.log(`Player ${username} (${socket.id}) joined`)

    createHost(gameState, { id: socket.id })
    createPlayer(gameState, { id: socket.id, username })

    io.emit('update_players', players)
    io.emit('update_status', { name: username, status: 'lobby' })
  })

  socket.on('start_game', async () => {
    startGame(io, questionTimer, gameState)
  })

  socket.on('change_category', (newCategories: string[]) => {
    categories = newCategories
    io.emit('update_categories', newCategories)
  })

  socket.on('restart_game', () => {
    questionTimer = undefined

    restartGame(io, gameState)
  })

  socket.on('submit_answer', (data: SubmitAnswer) => {
    submitAnswer(io, gameState, data)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)

    removePlayer(io, gameState, { id: socket.id })
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
