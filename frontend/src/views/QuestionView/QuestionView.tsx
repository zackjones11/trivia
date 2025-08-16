import type { Question } from '../../types'

import styles from './QuestionView.module.css'
import { Countdown, Layout, QuestionList } from '../../components'

type Props = {
  question: Question;
  timeRemaining: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export const QuestionView = (props: Props) => {
  const { timeRemaining, question, selectedAnswer, onSelectAnswer } = props

  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.questionNumber}>
            Question {question.id} / 10
          </div>

          <div className={styles.countdownContainer}>
            <Countdown seconds={timeRemaining} totalTime={10} />
          </div>
        </div>

        <div className={styles.questionTitle}>{question.title}</div>

        <QuestionList
          question={question}
          selectedAnswer={selectedAnswer}
          onSelect={onSelectAnswer}
        />
      </div>
    </Layout>
  )
}
