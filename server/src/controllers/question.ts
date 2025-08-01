import type { Server } from 'socket.io'
import type { GameState, Question, SubmitAnswer } from '../types'

import { pickRandomQuestion } from './state'

const TIMER_SECONDS = 5

const resetTimer = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  timer: NodeJS.Timeout | undefined,
) => {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    handleQuestionTimeout(
      io,
      availableQuestions,
      triviaQuestions,
      questionCount,
      timer,
    )
  }, TIMER_SECONDS * 1000)
}

export const sendQuestion = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  timer: NodeJS.Timeout | undefined,
) => {
  io.emit('update_status', 'show_question')
  io.emit(
    'new_question',
    pickRandomQuestion(availableQuestions, questionCount),
  )

  questionCount++

  resetTimer(io, availableQuestions, triviaQuestions, questionCount, timer)
}

const handleQuestionTimeout = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  timer: NodeJS.Timeout | undefined,
) => {
  io.emit('update_status', 'show_correct')
  io.emit('timer_up')

  setTimeout(() => {
    if (questionCount > Object.keys(triviaQuestions).length - 1) {
      io.emit('update_status', 'ended')
      clearTimeout(timer)
      return
    }

    sendQuestion(io, availableQuestions, triviaQuestions, questionCount, timer)
  }, 2000)
}

export const submitAnswer = (
  io: Server,
  gameState: GameState,
  data: SubmitAnswer,
) => {
  const { player, questionId, usersAnswer } = data
  const { questions, playerAnswers } = gameState
  const question = questions.find((value) => value.id === questionId)

  if (!playerAnswers[player]) {
    playerAnswers[player] = {}
  }

  const isCorrect = question?.correct_answer === usersAnswer
  playerAnswers[player][questionId] = isCorrect

  io.emit('update_player_scores', playerAnswers)
}

export const changeCategories = (
  io: Server,
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
  io.emit('update_categories', newCategories)
}
