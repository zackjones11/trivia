const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const NUMBER_OF_QUESTIONS = 2

const getPrompt = (numberOfQuestions: number, category: string) => {
  return `Generate ${numberOfQuestions} multiple-choice and unique trivia questions about ${category || "random topics"}.
    The questions should be of varying levels of difficulty and an equal distribution between the categories.
    Each question should have 4 answer options and clearly indicate the single correct answer.
    Present the output in a structured JSON array of objects, where each object has:

    - "id": number (1, 2, 3, 4)
    - "question": string
    - "options": array with string values
    - "correct_answer": the correct option value

    Example structure for one question:
    {
      "id": 1,
      "question": "What is the capital of England?",
      "options": [ "Berlin", "Madrid", "Paris", "London" ],
      "correct_answer": "London"
    }`;
}

export const fetchQuestions = async (categories: string[]) => {
    const text = getPrompt(NUMBER_OF_QUESTIONS, (categories).join(', ').replaceAll('_', ' '))
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
            responseMimeType: "application/json",
        },
    }

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json() as any

    return JSON.parse(data.candidates[0].content.parts[0].text)
}