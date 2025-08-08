import type { GameState } from '../types.ts'

export const createGameState = (): GameState => ({
  viewState: 'lobby',
  players: {},
  answerSubmissions: {},
  settings: {
    selectedCategories: [],
    phaseDuration: 10,
  },
  questions: [],
  currentQuestionIndex: -1,
  phaseStartAt: -1,
})

export const isLastPlayer = (gameState: GameState) =>
  Object.keys(gameState.players).length === 0
