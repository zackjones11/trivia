import type { GameState } from '../types'

export const createGameState = (): GameState => ({
  hostId: null,
  viewState: 'lobby',
  players: {},
  answerSubmissions: {},
  settings: {
    categories: [],
  },
  questions: [],
  currentQuestionIndex: -1,
})

export const isLastPlayer = (gameState: GameState) =>
  Object.keys(gameState.players).length === 0
