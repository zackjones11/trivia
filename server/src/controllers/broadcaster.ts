import type { Server } from 'socket.io'
import type { GameState } from '../types'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const { currentQuestionIndex } = gameState

  const currentQuestion =
    currentQuestionIndex > -1
      ? gameState.questions[currentQuestionIndex]
      : undefined

  io.emit('game_state_changed', {
    viewState: gameState.viewState,
    players: Object.values(gameState.players),
    hostId: gameState.hostId,
    question: currentQuestion,
  })
}
