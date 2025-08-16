import categories from '../api/categories.ts'

import type { Server } from 'socket.io'
import type { GameState } from '../types.ts'

export const broadcastGameStateChange = (io: Server, gameState: GameState) => {
  const {
    viewState,
    currentQuestionIndex,
    phaseStartAt,
    answerSubmissions,
    settings: {
      selectedCategories,
      questionPhaseDuration,
      answerPhaseDuration,
      numberOfQuestions,
    },
  } = gameState

  const question =
    currentQuestionIndex > -1
      ? gameState.questions[currentQuestionIndex]
      : undefined

  const players = Object.values(gameState.players)

  const phaseDuration =
    viewState === 'question' ? questionPhaseDuration : answerPhaseDuration

  io.emit('game_state_changed', {
    players,
    viewState,
    question,
    phaseStartAt,
    phaseDuration,
    answerSubmissions,
    categories,
    selectedCategories,
    numberOfQuestions,
  })
}
