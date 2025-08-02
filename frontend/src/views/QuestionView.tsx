import type { Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  timeRemaining: number;
  onSelectAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QuestionView = (props: Props) => {
  const { timeRemaining, question, onSelectAnswer } = props
  return (
    <>
      <h2>{question.title}</h2>
      <p>Remaining: {timeRemaining}</p>
      <ul className="options">
        {question.options.map((option) => (
          <div className="optionBox">
            <input
              type="radio"
              id={option}
              name={question.title}
              value={option}
              onChange={onSelectAnswer}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </ul>
    </>
  )
}
