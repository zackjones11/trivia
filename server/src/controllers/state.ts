import type { GameState } from '../types.ts'

export const ANSWER_PHASE_DURATION = 5

export const INITIAL_QUESTION_PHASE_DURATION = 10
export const INITIAL_NUMBER_OF_QUESTIONS = 10
export const INITIAL_SELECTED_CATEGORY = ['General Knowledge: General']

export const createGameState = (): GameState => ({
  viewState: 'lobby',
  players: {},
  answerSubmissions: {},
  settings: {
    selectedCategories: INITIAL_SELECTED_CATEGORY,
    questionPhaseDuration: INITIAL_QUESTION_PHASE_DURATION,
    numberOfQuestions: INITIAL_NUMBER_OF_QUESTIONS,
    answerPhaseDuration: ANSWER_PHASE_DURATION,
  },
  questions: [],
  currentQuestionIndex: -1,
  phaseStartAt: -1,
  timers: { questionPhaseTimeoutId: null, answerPhaseTimeoutId: null },
})

export const isLastPlayer = (gameState: GameState) =>
  Object.keys(gameState.players).length === 0
