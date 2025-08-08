import type { Server } from 'socket.io'
import { fetchQuestions } from '../api/fetchQuestions.ts'
import type { GameState } from '../types.ts'
import { sendQuestion } from './question.ts'
import { broadcastGameStateChange } from './broadcaster.ts'

export const startGame = async (io: Server, gameState: GameState) => {
  gameState.viewState = 'loading'

  broadcastGameStateChange(io, gameState)

  gameState.questions = await fetchQuestions(
    gameState.settings.selectedCategories,
  )
  gameState.viewState = 'question'

  sendQuestion(io, gameState)
}
