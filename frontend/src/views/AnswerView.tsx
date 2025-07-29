import type { Question } from '../types'

type Props = {
  question: Question;
  selectedAnswer?: string;
};

export const AnswerView = ({ question, selectedAnswer }: Props) => {
  return (
    <ul>
      {question.options.map((option) => (
        <li>
          {option} : {selectedAnswer === option ? 'true' : 'false'}
        </li>
      ))}

      {selectedAnswer?.toLowerCase() === question.correct_answer?.toLowerCase()
        ? 'Nice job!'
        : 'Better luck next time'}
    </ul>
  )
}
