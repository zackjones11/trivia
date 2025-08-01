import type { Server } from 'socket.io'
import type { GameState, SubmitAnswer } from '../types'

import { broadcastGameStateChange } from './broadcaster'

const TIME_PER_QUESTION = 5

let timer: NodeJS.Timeout | undefined = undefined

const resetTimer = (io: Server, gameState: GameState) => {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    handleQuestionTimeout(io, gameState)
  }, TIME_PER_QUESTION * 1000)
}

export const sendQuestion = (io: Server, gameState: GameState) => {
  gameState.viewState = 'question'
  gameState.currentQuestionIndex++
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

export const submitAnswer = (
  gameState: GameState,
  playerId: string,
  data: SubmitAnswer,
) => {
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex]

  if (currentQuestion?.correctAnswer === data.usersAnswer) {
    gameState.players[playerId].score = gameState.players[playerId].score + 1
  }
}

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
}
