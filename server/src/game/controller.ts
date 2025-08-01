import type { Server } from 'socket.io'
import type { Question } from '../types'

import { pickRandomQuestion } from './state'

const TIMER_SECONDS = 5

const resetTimer = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  questionTimer: NodeJS.Timeout | undefined,
) => {
  if (questionTimer) {
    clearTimeout(questionTimer)
  }

  questionTimer = setTimeout(() => {
    handleQuestionTimeout(
      io,
      availableQuestions,
      triviaQuestions,
      questionCount,
      questionTimer,
    )
  }, TIMER_SECONDS * 1000)
}

export const sendQuestion = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  questionTimer: NodeJS.Timeout | undefined,
) => {
  io.emit('update_status', 'show_question')
  io.emit(
    'new_question',
    pickRandomQuestion(availableQuestions, questionCount),
  )

  questionCount++

  resetTimer(
    io,
    availableQuestions,
    triviaQuestions,
    questionCount,
    questionTimer,
  )
}

const handleQuestionTimeout = (
  io: Server,
  availableQuestions: Question[],
  triviaQuestions: Question[],
  questionCount: number,
  questionTimer: NodeJS.Timeout | undefined,
) => {
  io.emit('update_status', 'show_correct')
  io.emit('timer_up')

  setTimeout(() => {
    if (questionCount > Object.keys(triviaQuestions).length - 1) {
      io.emit('update_status', 'ended')
      clearTimeout(questionTimer)
      return
    }

    sendQuestion(
      io,
      availableQuestions,
      triviaQuestions,
      questionCount,
      questionTimer,
    )
  }, 2000)
}
