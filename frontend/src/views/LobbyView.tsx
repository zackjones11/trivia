import type { Player } from '../types'

type Props = {
  selectedCategories: string[];
  isLoading: boolean;
  players: Player[];
  onStartGame: () => void;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const LobbyView = (props: Props) => {
  const {
    isLoading,
    selectedCategories,
    players,
    onStartGame,
    onChangeCategory,
  } = props

  return (
    <>
      <h2>Select Categories:</h2>
      <select
        name="categories"
        id="categories"
        multiple
        onChange={onChangeCategory}
      >
        <option value="food" selected={selectedCategories.includes('food')}>
          Food
        </option>
        <option value="cars" selected={selectedCategories.includes('cars')}>
          Cars
        </option>
      </select>

      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li>{player.name}</li>
        ))}
      </ul>

      <button onClick={onStartGame}>
        {isLoading ? 'Loading...' : 'Start Game'}
      </button>
    </>
  )
}
