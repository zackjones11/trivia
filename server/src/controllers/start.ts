import type { Server } from 'socket.io'
import { fetchQuestions } from '../api/fetchQuestions'
import type { GameState } from '../types'
import { sendQuestion } from './question'

export const startGame = async (io: Server, gameState: GameState) => {
  io.emit('update_status', 'loading')

  const { availableQuestions, questions, currentQuestionIndex, timer } =
    gameState

  gameState.questions = await fetchQuestions(gameState.settings.categories)
  gameState.availableQuestions = [...gameState.questions]
  io.emit('update_status', 'show_question')

  sendQuestion(io, availableQuestions, questions, currentQuestionIndex, timer)
}
