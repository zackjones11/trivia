import type { GameState } from '../types'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.currentQuestionIndex = -1
  gameState.questionCount = 0
  gameState.players = {}
}
