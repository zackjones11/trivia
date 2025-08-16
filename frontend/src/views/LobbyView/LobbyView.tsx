import type { CategoryGroup, Player } from '../../types'

import styles from './LobbyView.module.css'
import { ButtonGroup, PlayerList } from '../../components'
import { CategoryList } from './components'

type Props = {
  isHost: boolean;
  players: Player[];
  selectedCategories: string[];
  categories: CategoryGroup[];
  onStartGame: () => void;
  onChangeCategory: (newCategories: string[]) => void;
};

export const LobbyView = (props: Props) => {
  const {
    selectedCategories,
    categories,
    players,
    onStartGame,
    onChangeCategory,
  } = props

  const handleChangeCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selectedValue = event.currentTarget.value

    if (selectedCategories.includes(selectedValue)) {
      const newCategories = selectedCategories.filter(
        (category) => category !== selectedValue,
      )
      onChangeCategory(newCategories)
      return
    }

    onChangeCategory([...selectedCategories, selectedValue])
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.playersContainer}>
          <div className={styles.headline}>Players</div>
          <PlayerList
            players={players}
            endContent={(player) => (
              <>
                {player.isHost ? (
                  <span className={styles.pill}>Host</span>
                ) : null}
              </>
            )}
          />
        </div>

        <div className={styles.settingsContainer}>
          <div className={styles.headline}>Settings</div>

          <div className={styles.stepsGrid}>
            <div>
              <div className={styles.stepHeadline}>Step 1</div>
              <div className={styles.subLine}>Categories</div>
              <CategoryList
                onChange={handleChangeCategory}
                categories={categories}
                selectedCategories={selectedCategories}
              />
            </div>

            <div>
              <div className={styles.stepHeadline}>Step 2</div>
              <div className={styles.subLine}>Number of questions</div>
              <ButtonGroup items={['5', '10', '15', '20']} />

              <div className={styles.stepHeadline}>Step 3</div>
              <div className={styles.subLine}>Time per question</div>
              <ButtonGroup items={['10 seconds', '15 seconds', '20 seconds']} />
            </div>
          </div>

          <div className={styles.footer}>
            <button onClick={onStartGame} className={styles.button}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
