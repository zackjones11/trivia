export type Question = {
    id: number,
    question: string,
    options: string[],
    correct_answer: string
}

export type PlayerAnswers = Record<string, Record<string, boolean>>

export type SubmitAnswer = { player: string, usersAnswer: string, questionId: number }