import type { Player } from '../../types'

import styles from './PlayerList.module.css'

type Props = {
  players: Player[];
  endContent: (player: Player) => React.ReactElement;
};

export const PlayerList = ({ players, endContent }: Props) => (
  <ul className={styles.list}>
    {players.map((player, index) => {
      return (
        <li className={styles.item}>
          <div className={styles.content}>
            <span className={styles.count}>{index + 1}</span>
            <div className={styles.avatar}>{player.username[0]}</div>
            <span className="truncate">{player.username}</span>
          </div>

          {endContent(player)}
        </li>
      )
    })}
  </ul>
)
