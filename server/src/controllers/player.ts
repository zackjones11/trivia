import type { Server } from 'socket.io'
import type { GameState } from '../types'

export const createPlayer = (
  gameState: GameState,
  { id, username }: { id: string; username: string },
) => {
  gameState.players[id] = { id, username }
}

export const removePlayer = (
  io: Server,
  gameState: GameState,
  { id }: { id: string },
) => {
  delete gameState.players[id]

  const wasHost = id === gameState.hostId

  if (wasHost) {
    gameState.hostId = Object.keys(gameState.players)[0]
  }

  io.emit('update_players', gameState.players)
  io.emit('update_player_scores', gameState.playerAnswers)
}

export const createHost = (gameState: GameState, { id }: { id: string }) => {
  const isFirstPlayer = Object.keys(gameState.players).length === 0

  if (isFirstPlayer) {
    gameState.hostId = id
  }
}
