const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

import type { Question } from '../types.ts'

const NUMBER_OF_QUESTIONS = 10

const getPrompt = (numberOfQuestions: number, category: string) => {
  return `Generate ${numberOfQuestions} multiple-choice and unique trivia questions about ${category}.
    The questions should be of varying levels of difficulty and an equal distribution between the categories.
    Each question should have 4 answer options and clearly indicate the single correct answer.
    Present the output in a structured JSON array of objects, where each object has:

    - "id": number (1, 2, 3, 4)
    - "title": string ("What is the capital of England?")
    - "options": array with string values ([ "Berlin", "Madrid", "Paris", "London" ])
    - "correctAnswer": the correct option value ("London")

    Example structure for one question:
    {
      "id": 1,
      "title": "What is the capital of England?",
      "options": [ "Berlin", "Madrid", "Paris", "London" ],
      "correctAnswer": "London"
    }`
}

export const fetchQuestions = async (
  categories: string[],
): Promise<Question[]> => {
  const text = getPrompt(
    NUMBER_OF_QUESTIONS,
    categories.join(', ').replaceAll('_', ' '),
  )
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `API request failed with status ${response.status}: ${errorText}`,
    )
  }

  const data = (await response.json()) as any

  return JSON.parse(data.candidates[0].content.parts[0].text)

  // return Promise.resolve([
  //   {
  //     id: 1,
  //     title: 'What is the capital of England?',
  //     options: ['Berlin', 'Madrid', 'Paris', 'London'],
  //     correctAnswer: 'London',
  //   },
  //   {
  //     id: 2,
  //     title: 'What is the capital of Germany?',
  //     options: ['Berlin', 'Madrid', 'Paris', 'London'],
  //     correctAnswer: 'Berlin',
  //   },
  // ])
}
