import type { Server } from 'socket.io'
import type { GameState, SubmitAnswer } from '../types'

import { pickRandomQuestion } from './state'
import { broadcastGameStateChange } from './broadcaster'

const TIMER_SECONDS = 5

let timer: NodeJS.Timeout | undefined = undefined

const resetTimer = (io: Server, gameState: GameState) => {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    handleQuestionTimeout(io, gameState)
  }, TIMER_SECONDS * 1000)
}

export const sendQuestion = (io: Server, gameState: GameState) => {
  gameState.viewState = 'question'
  gameState.currentQuestion = pickRandomQuestion(
    gameState.availableQuestions,
    gameState.questionCount,
  )
  gameState.questionCount++

  broadcastGameStateChange(io, gameState)
  resetTimer(io, gameState)
}

const handleQuestionTimeout = (io: Server, gameState: GameState) => {
  gameState.viewState = 'answer'
  broadcastGameStateChange(io, gameState)

  io.emit('timer_up')

  const { questionCount, questions } = gameState

  setTimeout(() => {
    if (questionCount > Object.keys(questions).length - 1) {
      gameState.viewState = 'end'
      broadcastGameStateChange(io, gameState)
      clearTimeout(timer)
      return
    }

    sendQuestion(io, gameState)
  }, 2000)
}

export const submitAnswer = (gameState: GameState, data: SubmitAnswer) => {
  const { player, questionId, usersAnswer } = data
  const { questions, playerAnswers } = gameState
  const question = questions.find((value) => value.id === questionId)

  if (!playerAnswers[player]) {
    playerAnswers[player] = {}
  }

  const isCorrect = question?.correctAnswer === usersAnswer
  playerAnswers[player][questionId] = isCorrect
}

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
}
