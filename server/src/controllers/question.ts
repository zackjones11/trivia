import type { Server } from 'socket.io'
import type { GameState } from '../types'

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
  gameState.answerSubmissions = {}
  gameState.currentQuestionIndex++

  broadcastGameStateChange(io, gameState)
  resetTimer(io, gameState)
}

const handleQuestionTimeout = (io: Server, gameState: GameState) => {
  gameState.viewState = 'answer'
  broadcastGameStateChange(io, gameState)

  const { correctAnswer } = gameState.questions[gameState.currentQuestionIndex]

  for (const [id, answer] of Object.entries(gameState.answerSubmissions)) {
    console.log('answered', id, answer)
    if (answer === correctAnswer) {
      gameState.players[id].score += 1
    }
  }

  setTimeout(() => {
    if (gameState.currentQuestionIndex === Object.keys(gameState.questions).length - 1) {
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
  usersAnswer: string,
) => {
  gameState.answerSubmissions[playerId] = usersAnswer
}

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
}
