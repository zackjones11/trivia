import categories from '../api/categories.ts'

import type { Server } from 'socket.io'
import type { GameState } from '../types.ts'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const {
    viewState,
    currentQuestionIndex,
    phaseStartAt,
    answerSubmissions,
    settings,
  } = gameState

  const question =
    currentQuestionIndex > -1
      ? gameState.questions[currentQuestionIndex]
      : undefined

  const players = Object.values(gameState.players)

  io.emit('game_state_changed', {
    viewState,
    players,
    answerSubmissions,
    settings,
    question,
    phaseStartAt,
    categories,
  })
}
