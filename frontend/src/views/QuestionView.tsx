import type { Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QuestionView = (props: Props) => {
  const { question, selectedAnswer, onSelectAnswer } = props
  return (
    <>
      <h2>
        {question.count + 1}: {question.title}
      </h2>
      <ul className="options">
        {question.options.map((option) => (
          <div className="optionBox">
            <input
              checked={selectedAnswer === option}
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
