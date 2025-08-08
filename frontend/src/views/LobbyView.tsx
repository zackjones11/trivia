import type { CategoryGroup, Player } from '../types'

type Props = {
  isHost: boolean;
  players: Player[];
  selectedCategories: string[];
  categories: CategoryGroup[];
  onStartGame: () => void;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const LobbyView = (props: Props) => {
  const {
    isHost,
    selectedCategories,
    categories,
    players,
    onStartGame,
    onChangeCategory,
  } = props

  return (
    <>
      {isHost ? (
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
                  <option
                    key={option.value}
                    value={option.value}
                    selected={selectedCategories.includes(option.value)}
                  >
                    {option.text}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </>
      ) : (
        <>
          {selectedCategories.length === 0
            ? 'The host is selecting the categories'
            : `The host has selected the following categories so far: ${selectedCategories.join(', ')}`}
        </>
      )}

      <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li>{player.username}</li>
        ))}
      </ul>

      {isHost ? <button onClick={onStartGame}>Start Game</button> : null}
    </>
  )
}
