import type { GameState } from '../types'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.availableQuestions = []
  gameState.currentQuestion = undefined
  gameState.questionCount = 0
  gameState.playerAnswers = {}
  gameState.players = {}
}
