import type { GameState } from '../types'

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
}
