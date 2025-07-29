import type { Question } from '../types'

type Props = {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const QuestionView = (props: Props) => {
  const { question, selectedAnswer, onSelectAnswer } = props
  return (
    <>
      <h1>
        {question.count + 1}: {question.title}
      </h1>
      <ul>
        {question.options.map((option) => (
          <div>
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
