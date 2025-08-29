import type { Question } from '../../types'

import styles from './QuestionView.module.css'
import { Countdown, Layout, QuestionList } from '../../components'
import { useRemainingTime } from '../../hooks'

type Props = {
  question: Question;
  numberOfQuestions: number;
  phaseDuration: number;
  phaseStartAt: number;
  currentQuestionIndex: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export const QuestionView = (props: Props) => {
  const {
    question,
    phaseDuration,
    phaseStartAt,
    selectedAnswer,
    currentQuestionIndex,
    onSelectAnswer,
  } = props

  const timeRemaining = useRemainingTime(phaseStartAt, phaseDuration)

  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.questionNumber}>
            Question {currentQuestionIndex + 1} / {props.numberOfQuestions}
          </div>

          <div className={styles.countdownContainer}>
            <Countdown
              seconds={timeRemaining}
              totalTime={phaseDuration}
              useBeep
            />
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
