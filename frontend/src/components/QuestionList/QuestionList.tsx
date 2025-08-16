import classnames from 'classnames'

import styles from './QuestionList.module.css'
import type { Question } from '../../types'
import { useCallback } from 'react'

type Props =
  | {
      question: Question;
      selectedAnswer: string | undefined;
      onSelect: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => void;
    }
  | {
      question: Question;
      usersAnswer: string | undefined;
    };

export const QuestionList = (props: Props) => {
  const getOptionClassNames = useCallback(
    (option: string) => {
      if ('selectedAnswer' in props) {
        return classnames({
          [styles.button]: props.selectedAnswer !== option,
          [styles.buttonSelected]: props.selectedAnswer === option,
        })
      }

      return classnames({
        [styles.button]: true,
        [styles.buttonRed]:
          option === props.usersAnswer &&
          props.usersAnswer !== props.question.correctAnswer,
        [styles.buttonGreen]: option === props.question.correctAnswer,
      })
    },
    [props],
  )

  return (
    <div className={styles.container} role="radiogroup">
      {props.question.options.map((option, index) => (
        <button
          key={option}
          type="button"
          role="radio"
          className={getOptionClassNames(option)}
          value={option}
          onClick={'onSelect' in props ? props.onSelect : undefined}
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
