import type { AnswerSubmissions, Player, Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  players: Player[];
  timeRemaining: number;
  selectedAnswer?: string;
  answerSubmissions: AnswerSubmissions
};

export const AnswerView = ({ timeRemaining, players, question, selectedAnswer, answerSubmissions }: Props) => {
  const whoAnsweredCorrectly = Object.entries(answerSubmissions).filter(([, answer]) => answer === question.correctAnswer)
  return (
    <>
      <p>Next question in: {timeRemaining}</p>
      <ul className="answerList">
        {question.options.map((option) => (
          <li>
            {question.correctAnswer.toLowerCase() === option.toLowerCase()
              ? '✅'
              : '❌'}{' '}
            <span>{option}</span>
          </li>
        ))}
      </ul>

      <p>Well done:</p>
      <ul>
        {whoAnsweredCorrectly.map(([playerId]) => (<li>{players.find(({id}) => id === playerId)?.username}</li>) )}
      </ul>

      <p>
        {selectedAnswer?.toLowerCase() === question.correctAnswer?.toLowerCase()
          ? 'Nice job! 🚀'
          : 'Better luck next time 🙏'}
      </p>
    </>
  )
}
