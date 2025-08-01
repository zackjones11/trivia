import type { Server, Socket } from 'socket.io'
import { createHost, createPlayer, removePlayer } from './controllers/player'
import type { GameState, SubmitAnswer } from './types'
import { startGame } from './controllers/start'
import { changeCategories, submitAnswer } from './controllers/question'
import { restartGame } from './controllers/reset'
import { broadcastGameStateChange } from './controllers/broadcaster'

export const createHandlers = (
  socket: Socket,
  io: Server,
  gameState: GameState,
) => {
  socket.on('send_username', (username: string) => {
    console.log(`Player ${username} (${socket.id}) joined`)

    createHost(gameState, { id: socket.id })
    createPlayer(gameState, { id: socket.id, username })

    broadcastGameStateChange(io, gameState)
  })

  socket.on('start_game', async () => {
    startGame(io, gameState)
  })

  socket.on('change_category', (newCategories: string[]) => {
    changeCategories(gameState, newCategories)
    broadcastGameStateChange(io, gameState)
  })

  socket.on('restart_game', () => {
    restartGame(gameState)
    broadcastGameStateChange(io, gameState)
  })

  socket.on('submit_answer', (data: SubmitAnswer) => {
    submitAnswer(gameState, data)
    broadcastGameStateChange(io, gameState)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)

    removePlayer(gameState, { id: socket.id })
    broadcastGameStateChange(io, gameState)
  })
}
