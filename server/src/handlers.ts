import type { Server, Socket } from 'socket.io'
import { createHost, createPlayer, removePlayer } from './controllers/player'
import type { GameState } from './types'
import { startGame } from './controllers/start'
import { restartGame } from './controllers/reset'
import { broadcastGameStateChange } from './controllers/broadcaster'
import { isLastPlayer } from './controllers/state'
import { changeCategories } from './controllers/category'
import { submitAnswer } from './controllers/answer'

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

  socket.on('submit_answer', (usersAnswer: string) => {
    submitAnswer(gameState, socket.id, usersAnswer)
    broadcastGameStateChange(io, gameState)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)

    removePlayer(gameState, { id: socket.id })

    if (isLastPlayer(gameState)) {
      restartGame(gameState)
      return
    }

    broadcastGameStateChange(io, gameState)
  })
}
