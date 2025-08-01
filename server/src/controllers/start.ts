import type { Server } from 'socket.io'
import { fetchQuestions } from '../api/fetchQuestions'
import type { GameState } from '../types'
import { sendQuestion } from './question'

export const startGame = async (io: Server, gameState: GameState) => {
  gameState.viewState = 'question'
  gameState.questions = await fetchQuestions(gameState.settings.categories)

  sendQuestion(io, gameState)
}
