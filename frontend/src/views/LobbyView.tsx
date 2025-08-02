import type { CategoryGroup, Player } from '../types'

type Props = {
  players: Player[];
  categories: CategoryGroup[];
  onStartGame: () => void;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const LobbyView = (props: Props) => {
  const { categories, players, onStartGame, onChangeCategory } = props

  return (
    <>
      <h2>Select Categories:</h2>
      <select
        name="categories"
        id="categories"
        multiple
        onChange={onChangeCategory}
        style={{ height: 500 }}
      >
        {categories.map((categoryGroup) => (
          <optgroup key={categoryGroup.label} label={categoryGroup.label}>
            {categoryGroup.subCategories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li>{player.username}</li>
        ))}
      </ul>

      <button onClick={onStartGame}>Start Game</button>
    </>
  )
}
