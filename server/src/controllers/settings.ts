import type { GameState } from '../types.ts'

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.selectedCategories = newCategories
}

export const changeNumberOfQuestions = (
  gameState: GameState,
  numberOfQuestions: number,
) => {
  gameState.settings.numberOfQuestions = numberOfQuestions
}

export const changeQuestionPhaseDuration = (
  gameState: GameState,
  questionPhaseDuration: number,
) => {
  gameState.settings.questionPhaseDuration = questionPhaseDuration
}
