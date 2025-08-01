import type { Question } from '../types'
import './styles.css'

type Props = {
  question: Question;
  selectedAnswer?: string;
};

export const AnswerView = ({ question, selectedAnswer }: Props) => {
  return (
    <>
    <ul className='answerList'>
      {question.options.map((option) => (
        <li>
           {question.correct_answer.toLowerCase() === option.toLowerCase() ? '✅' : '❌'} <span>{option}</span>
        </li>
      ))}
    </ul>
    <p>{selectedAnswer?.toLowerCase() === question.correct_answer?.toLowerCase()
        ? 'Nice job! 🚀'
        : 'Better luck next time 🙏'}</p>
    </>
  )
}
