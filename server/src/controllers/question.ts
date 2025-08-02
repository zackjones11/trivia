import type { Server } from 'socket.io'

import { broadcastGameStateChange } from './broadcaster'
import { showAnswer } from './answer'

import type { GameState } from '../types'

export const sendQuestion = (io: Server, gameState: GameState) => {
  gameState.viewState = 'question'
  gameState.answerSubmissions = {}
  gameState.phaseStartAt = Date.now()
  gameState.currentQuestionIndex++

  broadcastGameStateChange(io, gameState)

  setTimeout(() => {
    showAnswer(io, gameState)
  }, gameState.settings.phaseDuration * 1000)
}
