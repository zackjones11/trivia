import { useCallback, useMemo, useState } from 'react'
import { PlayerList } from '../../components'
import { Layout } from '../../components'
import type { Player } from '../../types'

import styles from './EndView.module.css'
import { RecapPopup } from './components'

type Props = {
  players: Player[];
  onRestart: () => void;
};

export const EndView = ({ players, onRestart }: Props) => {
  const [showRecap, setShowRecap] = useState<number>()

  const playersSorted = useMemo(
    () => players.sort((a, b) => b.score - a.score),
    [players],
  )

  const toggleRecap = useCallback(
    (index: number) => {
      if (index === showRecap) {
        setShowRecap(undefined)
        return
      }

      setShowRecap(index)
    },
    [showRecap],
  )

  return (
    <Layout>
      <header className={styles.header}>
        <button className={styles.button} onClick={onRestart}>
          New Game
        </button>
      </header>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.headline}>Winner</div>
          <span>👑 {playersSorted[0].username}</span>
          <img
            src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
            alt="celebration"
            className={styles.gif}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.headline}>Leaderboard</div>

          <PlayerList
            players={playersSorted}
            endContent={({ score }, index) => (
              <div className={styles.playerEndContent}>
                <button
                  className={styles.recapButton}
                  onClick={() => toggleRecap(index)}
                >
                  {showRecap === index ? 'Hide' : 'Show'} recap
                </button>

                <span className={styles.score}>{score}/10</span>

                {showRecap === index && <RecapPopup />}
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  )
}
