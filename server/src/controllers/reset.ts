import type { GameState } from '../types.ts'
import { ANSWER_PHASE_DURATION, QUESTION_PHASE_DURATION } from './state.ts'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.currentQuestionIndex = -1
  gameState.answerSubmissions = {}
  gameState.settings.questionPhaseDuration = QUESTION_PHASE_DURATION
  gameState.settings.answerPhaseDuration = ANSWER_PHASE_DURATION
  gameState.settings.selectedCategories = []

  for (const player of Object.values(gameState.players)) {
    player.score = 0
  }

  if (gameState.timers.questionPhaseTimeoutId) {
    clearTimeout(gameState.timers.questionPhaseTimeoutId)
    gameState.timers.questionPhaseTimeoutId = null
  }

  if (gameState.timers.answerPhaseTimeoutId) {
    clearTimeout(gameState.timers.answerPhaseTimeoutId)
    gameState.timers.answerPhaseTimeoutId = null
  }
}
