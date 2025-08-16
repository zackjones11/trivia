import { PlayerList } from '../../components'
import type { Player } from '../../types'

import styles from './EndView.module.css'

type Props = {
  players: Player[];
  onRestart: () => void;
};

export const EndView = ({ players, onRestart }: Props) => {
  const playersSorted = players.sort((a, b) => b.score - a.score)

  return (
    <div className={styles.container}>
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
            endContent={({ score }) => (
              <span className={styles.leaderboardItemScore}>{score}/10</span>
            )}
          />
        </div>
      </div>
    </div>
  )
}
