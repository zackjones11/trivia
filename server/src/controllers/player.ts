import type { GameState } from '../types'

export const createPlayer = (
  gameState: GameState,
  { id, username }: { id: string; username: string },
) => {
  const isFirstPlayer = Object.keys(gameState.players).length === 0

  gameState.players[id] = { id, username, score: 0, isHost: isFirstPlayer }
}

export const removePlayer = (gameState: GameState, { id }: { id: string }) => {
  if (!gameState.players[id]) return

  const wasHost = gameState.players[id].isHost

  delete gameState.players[id]

  if (wasHost) {
    const remainingPlayerIds = Object.keys(gameState.players)

    if (remainingPlayerIds.length > 0) {
      const newHostId = remainingPlayerIds[0]
      gameState.players[newHostId].isHost = true
    }
  }
}
