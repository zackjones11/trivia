import { Layout, Countdown } from '../../components'
import type { AnswerSubmissions, Player, Question } from '../../types'

import styles from './AnswerView.module.css'
import { QuestionList } from '../../components'
import { PlayersAnswers } from './components'
import { useMemo } from 'react'
import { useRemainingTime } from '../../hooks'

type Props = {
  question: Question;
  players: Player[];
  playerId: string;
  phaseStartAt: number;
  phaseDuration: number;
  numberOfQuestions: number;
  answerSubmissions: AnswerSubmissions;
};

export const AnswerView = (props: Props) => {
  const { phaseDuration, phaseStartAt, players, question, answerSubmissions } =
    props

  const usersAnswer = useMemo(
    () => answerSubmissions[props.playerId],
    [props.playerId, answerSubmissions],
  )

  const timeRemaining = useRemainingTime(phaseStartAt, phaseDuration)

  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.questionNumber}>
            Question {question.id} / {props.numberOfQuestions}
          </div>
          <div className={styles.countdownContainer}>
            <Countdown seconds={timeRemaining} totalTime={phaseDuration} />
          </div>
        </div>

        <div className={styles.questionTitle}>{question.title}</div>

        <QuestionList question={question} usersAnswer={usersAnswer} />

        <PlayersAnswers
          answerSubmissions={answerSubmissions}
          players={players}
          correctAnswer={question.correctAnswer}
        />
      </div>
    </Layout>
  )
}
