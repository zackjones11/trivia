import type { PlayerAnswers, Question } from '../types'

type GameState = {
  categories: string[];
  triviaQuestions: Question[];
  availableQuestions: Question[];
  questionCount: number;
  players: Map<any, any>;
  socketIdToName: Map<any, any>;
  playerAnswers: PlayerAnswers;
  questionTimer: NodeJS.Timeout | undefined;
};

export const createGameState = (): GameState => {
  const categories: string[] = []
  const triviaQuestions: Question[] = []
  const availableQuestions = [...triviaQuestions]
  const questionCount = 0
  const players = new Map()
  const socketIdToName = new Map()
  const playerAnswers: PlayerAnswers = {}
  const questionTimer: NodeJS.Timeout | undefined = undefined

  return {
    categories,
    triviaQuestions,
    availableQuestions,
    questionCount,
    players,
    socketIdToName,
    playerAnswers,
    questionTimer,
  }
}

export const pickRandomQuestion = (availableQuestions: Question[], questionCount: number) => {
  const randomIndex = Math.floor(Math.random() * availableQuestions.length)
  const questionObj = availableQuestions.splice(randomIndex, 1)[0]
  const currentQuestionCorrectAnswer = questionObj.correct_answer
    .toLowerCase()
    .trim()

  return {
    count: questionCount,
    id: questionObj.id,
    title: questionObj.question,
    options: questionObj.options,
    correct_answer: currentQuestionCorrectAnswer,
  }
}
