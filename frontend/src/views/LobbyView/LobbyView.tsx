import type { CategoryGroup, Player } from '../../types'

import styles from './LobbyView.module.css'
import { ButtonGroup, Layout, PlayerList } from '../../components'
import { CategoryList } from './components'

export type Settings = {
  selectedCategories: string[];
  numberOfQuestions: number;
  questionPhaseDuration: number;
};

type Props = {
  isHost: boolean;
  players: Player[];
  categories: CategoryGroup[];
  settings: Settings;
  onStartGame: () => void;
  onChangeSettings: (settings: Partial<Settings>) => void;
};

export const LobbyView = (props: Props) => {
  const { categories, players, settings, onStartGame, onChangeSettings } =
    props

  const handleChangeCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selectedValue = event.currentTarget.value

    if (settings.selectedCategories.includes(selectedValue)) {
      const newCategories = settings.selectedCategories.filter(
        (category) => category !== selectedValue,
      )
      onChangeSettings({ selectedCategories: newCategories })
      return
    }

    onChangeSettings({
      selectedCategories: [...settings.selectedCategories, selectedValue],
    })
  }

  const handleChangeNumberOfQuestions = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onChangeSettings({
      numberOfQuestions: Number(event.currentTarget.value),
    })
  }

  const handleChangeDuration = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onChangeSettings({
      questionPhaseDuration: Number(event.currentTarget.value),
    })
  }

  return (
    <Layout>
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
                selectedCategories={settings.selectedCategories}
              />
            </div>

            <div>
              <div className={styles.stepHeadline}>Step 2</div>
              <div className={styles.subLine}>Number of questions</div>
              <ButtonGroup
                items={[5, 10, 15, 20]}
                selected={settings.numberOfQuestions}
                onChange={handleChangeNumberOfQuestions}
              />

              <div className={styles.stepHeadline}>Step 3</div>
              <div className={styles.subLine}>Time per question</div>
              <ButtonGroup
                suffix=" seconds"
                items={[10, 15, 20]}
                selected={settings.questionPhaseDuration}
                onChange={handleChangeDuration}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button onClick={onStartGame} className={styles.button}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
