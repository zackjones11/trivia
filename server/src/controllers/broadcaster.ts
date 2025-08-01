import type { Server } from 'socket.io'
import type { GameState } from '../types'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const { currentQuestion } = gameState

  io.emit('game_state_changed', {
    viewState: gameState.viewState,
    players: Object.values(gameState.players),
    playerAnswers: gameState.playerAnswers,
    hostId: gameState.hostId,
    question: currentQuestion,
  })
}
