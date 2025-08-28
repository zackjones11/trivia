import React from 'react'
import type { AnswerSubmissions, Player } from '../../../../types'

import styles from './PlayerAnswers.module.css'

type Props = {
  correctAnswer: string;
  answerSubmissions: AnswerSubmissions;
  currentQuestionIndex: number;
  players: Player[];
};

const AnswerIcon = ({
  usersAnswer,
  correctAnswer,
}: {
  usersAnswer: string | undefined;
  correctAnswer: string;
}) => {
  if (usersAnswer === undefined) {
    return <span className={styles.hyphen}>&#8208;</span>
  }

  if (usersAnswer === correctAnswer) {
    return <span className={styles.check}>&#10003;</span>
  }

  return <span className={styles.cross}>&#10008;</span>
}

export const PlayersAnswers = ({
  players,
  answerSubmissions,
  currentQuestionIndex,
  correctAnswer,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.headline}>Players' answers</div>
      <ul className={styles.list}>
        <li className={styles.item}>
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <AnswerIcon
                correctAnswer={correctAnswer}
                usersAnswer={
                  answerSubmissions[player.id]?.[currentQuestionIndex]
                }
              />

              <span className={styles.username}>{player.username}</span>
            </React.Fragment>
          ))}
        </li>
      </ul>
    </div>
  )
}
