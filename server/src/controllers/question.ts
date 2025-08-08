import type { Server } from 'socket.io'

import { broadcastGameStateChange } from './broadcaster.ts'
import { showAnswer } from './answer.ts'

import type { GameState } from '../types.ts'

export const sendQuestion = (io: Server, gameState: GameState) => {
  gameState.viewState = 'question'
  gameState.answerSubmissions = {}
  gameState.phaseStartAt = Date.now()
  gameState.currentQuestionIndex++

  broadcastGameStateChange(io, gameState)

  setTimeout(() => {
    showAnswer(io, gameState)
  }, gameState.settings.questionPhaseDuration * 1000)
}
