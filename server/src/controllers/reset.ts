import type { GameState } from '../types.ts'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.currentQuestionIndex = -1
  gameState.answerSubmissions = {}
  gameState.settings.phaseDuration = 10
  gameState.settings.selectedCategories = []

  for (const player of Object.values(gameState.players)) {
    player.score = 0
  }
}
