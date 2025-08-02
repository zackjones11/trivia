import type { GameState } from '../types'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'join'
  gameState.questions = []
  gameState.currentQuestionIndex = -1
  gameState.answerSubmissions = {}

  for (const player of Object.values(gameState.players)) {
    player.score = 0
  }
}
