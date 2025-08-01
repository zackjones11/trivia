import type { GameState, Question } from '../types'

export const createGameState = (): GameState => ({
  hostId: null,
  viewState: 'lobby',
  players: {},
  settings: {
    categories: [],
  },
  questions: [],
  availableQuestions: [],
  currentQuestion: undefined,
  questionCount: 0,
})

export const pickRandomQuestion = (
  availableQuestions: Question[],
  questionCount: number,
) => {
  const randomIndex = Math.floor(Math.random() * availableQuestions.length)
  const questionObj = availableQuestions.splice(randomIndex, 1)[0]

  return {
    count: questionCount,
    id: questionObj.id,
    title: questionObj.question,
    options: questionObj.options,
    correctAnswer: questionObj.correctAnswer,
  }
}
