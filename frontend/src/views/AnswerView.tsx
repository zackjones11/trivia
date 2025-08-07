import type { AnswerSubmissions, Player, Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  players: Player[];
  playerId: string;
  timeRemaining: number;
  answerSubmissions: AnswerSubmissions;
};

export const AnswerView = (props: Props) => {
  const {
  timeRemaining,
  players,
  question,
  answerSubmissions,
} = props
  const whoAnsweredCorrectly = Object.entries(answerSubmissions).filter(
    ([, answer]) => answer === question.correctAnswer,
  )
  const answeredCorrectly = Object.entries(whoAnsweredCorrectly).some(([, [playerId]]) => {
    return playerId === props.playerId
  })
  return (
    <>
      <p>Next question in: {timeRemaining}</p>
      <ul className="answerList">
        {question.options.map((option) => (
          <li>
            {question.correctAnswer === option ? '✅' : '❌'}
            <span>{option}</span>
          </li>
        ))}
      </ul>

      <p>Well done:</p>
      <ul>
        {whoAnsweredCorrectly.map(([playerId]) => (
          <li>{players.find(({ id }) => id === playerId)?.username}</li>
        ))}
      </ul>

      <p>
        {answeredCorrectly ? 'Nice job! 🚀' : 'Better luck next time 🙏'}
      </p>
    </>
  )
}
