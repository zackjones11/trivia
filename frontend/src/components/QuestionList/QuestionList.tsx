import classnames from 'classnames'

import styles from './QuestionList.module.css'
import type { Question } from '../../types'

type Props = {
  question: Question;
  selectedAnswer: string | undefined;
  onSelect: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const QuestionList = ({ question, selectedAnswer, onSelect }: Props) => {
  return (
    <div className={styles.container} role="radiogroup">
      {question.options.map((option, index) => (
        <button
          key={option}
          type="button"
          role="radio"
          className={classnames({
            [styles.button]: selectedAnswer !== option,
            [styles.buttonSelected]: selectedAnswer === option,
          })}
          value={option}
          onClick={onSelect}
        >
          <div className={styles.content}>
            <div className={styles.count}>{index + 1}</div>
            <div className={styles.text}>{option}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
