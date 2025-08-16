import type { AnswerSubmissions, Player } from '../../../../types'

import styles from './PlayerAnswers.module.css'

type Props = {
  correctAnswer: string;
  answerSubmissions: AnswerSubmissions;
  players: Player[];
};

export const PlayersAnswers = ({
  players,
  answerSubmissions,
  correctAnswer,
}: Props) => (
  <div className={styles.container}>
    <div className={styles.headline}>Players' answers</div>
    <ul className={styles.list}>
      <li className={styles.item}>
        {Object.entries(answerSubmissions).map(([playerId, answer]) => (
          <>
            {answer === correctAnswer ? (
              <span className={styles.check}>&#10003;</span>
            ) : (
              <span className={styles.cross}>&#10008;</span>
            )}
            <span className={styles.username}>
              {players.find(({ id }) => id === playerId)?.username}
            </span>
          </>
        ))}
      </li>
    </ul>
  </div>
)
