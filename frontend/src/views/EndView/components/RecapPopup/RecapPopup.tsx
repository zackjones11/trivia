import type { Question } from '../../../../types'
import styles from './RecapPopup.module.css'

export const RecapPopup = ({
  questions,
  playerAnswers,
}: {
  questions: Question[];
  playerAnswers: string[];
}) => (
  <div className={styles.container}>
    {questions.map((question, index) => (
      <div className={styles.item}>
        <div className={styles.count}>Q{index + 1}</div>
        <div className={styles.incorrect}>{playerAnswers?.[index] ?? '-'}</div>
        <div className={styles.crossIcon}>
          {playerAnswers?.[index] === question.correctAnswer ? (
            <div className={styles.checkIcon}>&#10003;</div>
          ) : (
            <div className={styles.crossIcon}>&#10008;</div>
          )}
        </div>
      </div>
    ))}
  </div>
)
