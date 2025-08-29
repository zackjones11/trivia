import type { CategoryGroup, Player, Settings } from '../../types'

import styles from './LobbyView.module.css'
import { ButtonGroup, Layout, PlayerList } from '../../components'
import { CategoryList } from './components'
import { useCallback, useMemo } from 'react'

type Props = {
  playerId: string | undefined;
  players: Player[];
  categories: CategoryGroup[];
  settings: Settings;
  onStartGame: () => void;
  onChangeSettings: (settings: Partial<Settings>) => void;
};

export const LobbyView = (props: Props) => {
  const {
    playerId,
    categories,
    players,
    settings,
    onStartGame,
    onChangeSettings,
  } = props

  const handleChangeCategory = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    },
    [onChangeSettings, settings.selectedCategories],
  )

  const handleChangeNumberOfQuestions = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onChangeSettings({
        numberOfQuestions: Number(event.currentTarget.value),
      })
    },
    [onChangeSettings],
  )

  const handleChangeDuration = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onChangeSettings({
        questionPhaseDuration: Number(event.currentTarget.value),
      })
    },
    [onChangeSettings],
  )

  const isHost = useMemo(
    () => players.find((player) => player.id === playerId)?.isHost,
    [players, playerId],
  )

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
              <div className={styles.subLine}>
                Categories{' '}
                <span>({settings.selectedCategories.length} selected)</span>
              </div>
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
                disabled={!isHost}
              />

              <div className={styles.stepHeadline}>Step 3</div>
              <div className={styles.subLine}>Time per question</div>
              <ButtonGroup
                suffix=" seconds"
                items={[10, 15, 20]}
                selected={settings.questionPhaseDuration}
                onChange={handleChangeDuration}
                disabled={!isHost}
              />
            </div>
          </div>

          <div className={styles.footer}>
            {!settings.selectedCategories.length && (
              <span className={styles.warning}>
                Please select at least 1 category
              </span>
            )}

            {!isHost && (
              <span className={styles.warning}>
                Only the host can start the game
              </span>
            )}

            <button
              onClick={onStartGame}
              className={styles.button}
              disabled={!isHost || !settings.selectedCategories.length}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
