import type { Server } from 'socket.io'

import { broadcastGameStateChange } from './broadcaster.ts'
import { sendQuestion } from './question.ts'

import type { GameState } from '../types.ts'

export const submitAnswer = (
  gameState: GameState,
  playerId: string,
  usersAnswer: string,
) => {
  const answers = gameState.answerSubmissions[playerId] ?? []

  answers[gameState.currentQuestionIndex] = usersAnswer

  gameState.answerSubmissions[playerId] = answers
}

export const showAnswer = (io: Server, gameState: GameState) => {
  gameState.viewState = 'answer'
  gameState.phaseStartAt = Date.now()

  const { correctAnswer } = gameState.questions[gameState.currentQuestionIndex]

  for (const [id, answers] of Object.entries(gameState.answerSubmissions)) {
    const answer = answers[gameState.currentQuestionIndex]

    if (answer === correctAnswer) {
      gameState.players[id].score += 1
    }
  }

  broadcastGameStateChange(io, gameState)

  gameState.timers.answerPhaseTimeoutId = setTimeout(() => {
    if (gameState.currentQuestionIndex + 1 < gameState.questions.length) {
      sendQuestion(io, gameState)
      return
    }

    gameState.viewState = 'end'
    broadcastGameStateChange(io, gameState)
  }, gameState.settings.answerPhaseDuration * 1000)
}
