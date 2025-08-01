import type { GameState } from '../types'

export const createGameState = (): GameState => ({
  hostId: null,
  viewState: 'lobby',
  players: {},
  settings: {
    categories: [],
  },
  questions: [],
  currentQuestionIndex: -1,
})
