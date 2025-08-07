import type { Server } from 'socket.io'
import { fetchQuestions } from '../api/fetchQuestions.ts'
import type { GameState } from '../types.ts'
import { sendQuestion } from './question.ts'

type Data = { selectedCategories: string[] };

export const startGame = async (
  io: Server,
  gameState: GameState,
  data: Data,
) => {
  gameState.viewState = 'question'
  gameState.questions = await fetchQuestions(data.selectedCategories)

  sendQuestion(io, gameState)
}
