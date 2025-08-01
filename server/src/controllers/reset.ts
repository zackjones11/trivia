import type { GameState } from '../types'

export const restartGame = (gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.currentQuestionIndex = -1

  for (const player of Object.values(gameState.players)) {
    player.score = 0
  }
}
