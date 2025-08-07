import type { Server } from 'socket.io'
import { fetchQuestions } from '../api/fetchQuestions.ts'
import type { GameState } from '../types.ts'
import { sendQuestion } from './question.ts'
import { broadcastGameStateChange } from './broadcaster.ts'

type Data = { selectedCategories: string[] };

export const startGame = async (
  io: Server,
  gameState: GameState,
  data: Data,
) => {
  gameState.viewState = 'loading'

  broadcastGameStateChange(io, gameState)
  
  gameState.questions = await fetchQuestions(data.selectedCategories)
  gameState.viewState = 'question'

  sendQuestion(io, gameState)
}
