import type { Server, Socket } from 'socket.io'
import { createHost, createPlayer, removePlayer } from './controllers/player'
import type { GameState, SubmitAnswer } from './types'
import { startGame } from './controllers/start'
import { changeCategories, submitAnswer } from './controllers/question'
import { restartGame } from './controllers/reset'

export const createHandlers = (socket: Socket, io: Server, questionTimer: undefined | NodeJS.Timeout, gameState: GameState) => {
socket.on('send_username', (username: string) => {
    console.log(`Player ${username} (${socket.id}) joined`)

    createHost(gameState, { id: socket.id })
    createPlayer(gameState, { id: socket.id, username })

    io.emit('update_players', gameState.players)
    io.emit('update_status', { name: username, status: 'lobby' })
  })

  socket.on('start_game', async () => {
    startGame(io, questionTimer, gameState)
  })

  socket.on('change_category', (newCategories: string[]) => {
    changeCategories(io, gameState, newCategories)
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
}