import type { Player } from '../../types'

import styles from './PlayerList.module.css'

type Props = {
  players: Player[];
};

export const PlayerList = ({ players }: Props) => (
  <ul className={styles.list}>
    {players.map((player) => {
      return (
        <li className={styles.item}>
          <div className={styles.content}>
            <div className={styles.avatar}>{player.username[0]}</div>
            <span className="truncate">{player.username}</span>
          </div>

          {player.isHost ? <span className={styles.pull}>Host</span> : null}
        </li>
      )
    })}
  </ul>
)
