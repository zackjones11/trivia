import type { GameState } from '../types.ts'

export const changeCategories = (
  gameState: GameState,
  newCategories: string[],
) => {
  gameState.settings.categories = newCategories
}
