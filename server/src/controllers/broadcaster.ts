import type { Server } from 'socket.io'
import type { GameState } from '../types.ts'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const {
    viewState,
    currentQuestionIndex,
    phaseStartAt,
    answerSubmissions,
    settings: { categories, phaseDuration },
  } = gameState

  const question =
    currentQuestionIndex > -1
      ? gameState.questions[currentQuestionIndex]
      : undefined

  const players = Object.values(gameState.players)

  io.emit('game_state_changed', {
    players,
    viewState,
    question,
    phaseStartAt,
    phaseDuration,
    answerSubmissions,
    categories,
  })
}
