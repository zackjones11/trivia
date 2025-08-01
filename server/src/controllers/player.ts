import type { GameState } from '../types'

export const createPlayer = (
  gameState: GameState,
  { id, username }: { id: string; username: string },
) => {
  gameState.players[id] = { id, username }
}

export const removePlayer = (gameState: GameState, { id }: { id: string }) => {
  delete gameState.players[id]

  const wasHost = id === gameState.hostId

  if (wasHost) {
    gameState.hostId = Object.keys(gameState.players)[0]
  }
}

export const createHost = (gameState: GameState, { id }: { id: string }) => {
  const isFirstPlayer = Object.keys(gameState.players).length === 0

  if (isFirstPlayer) {
    gameState.hostId = id
  }
}
