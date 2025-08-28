import type { Question } from '../types.ts'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const API_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

type Candidate = {
  content: {
    parts: { text: string }[];
  };
};

type Response = {
  candidates: Candidate[];
};

const getPrompt = (numberOfQuestions: number, category: string) => {
  return `Imagine you are doing a quirky trivia pub quiz. Come up with ${numberOfQuestions} multiple-choice questions that are unique and interesting about ${category}.
    The questions should be a mix of medium and hard difficulty but not easy and an equal distribution between the categories.
    Each question should have 4 answer options and clearly indicate the single correct answer.
    Make sure that the correct answer is on a random position in the options. It should not be on the same position.

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

// Mock data:
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

export const fetchQuestions = async (
  numberOfQuestions: number,
  categories: string[],
): Promise<Question[]> => {
  const text = getPrompt(numberOfQuestions, categories.join(', '))

  const requestBody = {
    contents: [{ parts: [{ text }] }],
    generationConfig: { responseMimeType: 'application/json' },
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

  const data = (await response.json()) as Response

  return JSON.parse(data.candidates[0].content.parts[0].text)
}
