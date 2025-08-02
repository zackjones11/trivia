import type { Server } from 'socket.io'
import type { GameState } from '../types'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const {
    hostId,
    viewState,
    currentQuestionIndex,
    phaseStartAt,
    settings: { phaseDuration },
  } = gameState

  const question =
    currentQuestionIndex > -1
      ? gameState.questions[currentQuestionIndex]
      : undefined

  const players = Object.values(gameState.players)

  io.emit('game_state_changed', {
    players,
    viewState,
    hostId,
    question,
    phaseStartAt,
    phaseDuration,
  })
}
