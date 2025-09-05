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
  return `You are a trivia game API. Your task is to generate a set of ${numberOfQuestions} unique and interesting multiple-choice questions for a quirky pub quiz, covering the following categories: ${category}.

The questions must adhere to the following strict rules:
  
1.  **Number of Questions:** Exactly ${numberOfQuestions} questions must be generated.
2.  **Difficulty:** The difficulty of the questions should be a mix of medium and hard. Do not include easy questions.
3.  **Category Distribution:** Ensure an equal distribution of questions across the provided categories.
4.  **Answer Options:** Each question must have exactly four (4) answer options.
5.  **Single Correct Answer:** There must be only one correct answer per question.
6.  **Factual Accuracy:** All questions and their corresponding correct answers must be 100% factually correct.
7.  **Time Specificity:** If a question relates to a specific historical event or period, the exact year or a clear date range must be included in the question's \`title\`. For example, "In 1977, which city..." or "During the Cold War, which country...".
8.  **Output Format:** The response must be a single, valid JSON array of objects. Do not include any other text, explanations, or code formatting outside of the JSON.

Each JSON object in the array must contain the following keys and value types:

-   \`title\`: A string containing the full question text.
-   \`options\`: An array of four strings representing the multiple-choice options.
-   \`correctAnswer\`: A string that matches one of the values in the \`options\` array, representing the single correct answer.

Example of the desired JSON structure for a single question:

\`\`\`json
{
  "title": "Which planet is known as the 'Red Planet'?",
  "options": ["Jupiter", "Mars", "Venus", "Saturn"],
  "correctAnswer": "Mars"
}
\`\`\`
`
}

// Mock data:
// return Promise.resolve([
//   {
//     title: 'What is the capital of England?',
//     options: ['Berlin', 'Madrid', 'Paris', 'London'],
//     correctAnswer: 'London',
//   },
//   {
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
  const questions = JSON.parse(
    data.candidates[0].content.parts[0].text,
  ) as Question[]

  return questions.reduce<Question[]>((acc, curr) => {
    const options = curr.options.sort(() => 0.5 - Math.random())
    return [...acc, { ...curr, options }]
  }, [])
}
