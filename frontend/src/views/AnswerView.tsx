import type { AnswerSubmissions, Player, Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  players: Player[];
  playerId: string;
  timeRemaining: number;
  username: string;
  answerSubmissions: AnswerSubmissions;
};

export const AnswerView = (props: Props) => {
  const {
  timeRemaining,
  players,
  username,
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

      <p>
        {answeredCorrectly ? `Nice job ${username}! 🚀` : 'Better luck next time 🙏'}
      </p>

      {whoAnsweredCorrectly.length > 0 ? (
        <>
          <p>Well done:</p>
            <ul>
              {whoAnsweredCorrectly.map(([playerId]) => (
                <li>{players.find(({ id }) => id === playerId)?.username}</li>
              ))}
          </ul>
        </>
    ) : <p>That was a tricky one!</p>}
    </>
  )
}
