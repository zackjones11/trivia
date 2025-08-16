import type { GameState } from '../types.ts'

export const QUESTION_PHASE_DURATION = 10
export const ANSWER_PHASE_DURATION = 10

export const createGameState = (): GameState => ({
  viewState: 'lobby',
  players: {},
  answerSubmissions: {},
  settings: {
    selectedCategories: ['general_knowledge_general'],
    questionPhaseDuration: QUESTION_PHASE_DURATION,
    answerPhaseDuration: ANSWER_PHASE_DURATION,
  },
  questions: [],
  currentQuestionIndex: -1,
  phaseStartAt: -1,
  timers: { questionPhaseTimeoutId: null, answerPhaseTimeoutId: null },
})

export const isLastPlayer = (gameState: GameState) =>
  Object.keys(gameState.players).length === 0
