import type { Server, Socket } from 'socket.io'
import { createPlayer, removePlayer } from './controllers/player.ts'
import type { GameState } from './types.ts'
import { startGame } from './controllers/start.ts'
import { restartGame } from './controllers/reset.ts'
import { broadcastGameStateChange } from './controllers/broadcaster.ts'
import { isLastPlayer } from './controllers/state.ts'
import { changeCategories } from './controllers/category.ts'
import { submitAnswer } from './controllers/answer.ts'

export const createHandlers = (
  socket: Socket,
  io: Server,
  gameState: GameState,
) => {
  socket.on('send_username', (username: string) => {
    console.log(`Player ${username} (${socket.id}) joined`)

    createPlayer(gameState, { id: socket.id, username })

    gameState.viewState = 'lobby'

    broadcastGameStateChange(io, gameState)
  })

  socket.on('start_game', async (selectedCategories: string[]) => {
    startGame(io, gameState, { selectedCategories })
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
    }

    broadcastGameStateChange(io, gameState)
  })
}
