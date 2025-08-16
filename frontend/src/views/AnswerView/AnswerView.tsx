import { Countdown } from '../../components/Countdown/Countdown'
import type { AnswerSubmissions, Player, Question } from '../../types'

import styles from './AnswerView.module.css'
import { QuestionList } from '../../components'
import { PlayersAnswers } from './components'

type Props = {
  question: Question;
  players: Player[];
  playerId: string;
  timeRemaining: number;
  answerSubmissions: AnswerSubmissions;
};

export const AnswerView = (props: Props) => {
  const { timeRemaining, players, question, answerSubmissions } = props

  const usersAnswer = answerSubmissions[props.playerId]

  return (
    <div className={styles.container}>
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

        <QuestionList question={question} usersAnswer={usersAnswer} />

        <PlayersAnswers
          answerSubmissions={answerSubmissions}
          players={players}
          correctAnswer={question.correctAnswer}
        />
      </div>
    </div>
  )
}
