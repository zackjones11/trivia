import type { Server } from 'socket.io'
import type { GameState } from '../types'

export const restartGame = (io: Server, gameState: GameState) => {
  gameState.viewState = 'lobby'
  gameState.questions = []
  gameState.availableQuestions = []
  gameState.currentQuestionIndex = -1
  gameState.playerAnswers = {}
  gameState.players = {}
  gameState.timer = undefined

  io.emit('update_status', 'lobby')
  io.emit('update_player_scores', {})
}
