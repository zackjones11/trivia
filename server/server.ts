import * as express from 'express'
import * as http from 'http'
import { Server, Socket } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const NUMBER_OF_QUESTIONS = 2
const TIMER_SECONDS = 5

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

type Question = {
    id: number,
    question: string,
    options: string[],
    correct_answer: string
}

type PlayerAnswers = Record<string, Record<string, boolean>>

type SubmitAnswer = { player: string, usersAnswer: string, questionId: number }

let categories: string[] = []
let triviaQuestions: Question[] = []
let availableQuestions = [...triviaQuestions]
let questionCount = 0
const players = new Map()
let playerAnswers: PlayerAnswers = {}
let questionTimer: NodeJS.Timeout | undefined = undefined

const pickRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const questionObj = availableQuestions.splice(randomIndex, 1)[0]
    const currentQuestionCorrectAnswer = questionObj.correct_answer.toLowerCase().trim()

    return {
        count: questionCount,
        id: questionObj.id,
        title: questionObj.question,
        options: questionObj.options,
        correct_answer: currentQuestionCorrectAnswer
    }
}

const sendQuestion = () => {
    io.emit('update_status', 'show_question')
    io.emit('new_question', pickRandomQuestion())

    questionCount++

    resetTimer()
}

const resetTimer = () => {
    if (questionTimer) {
        clearTimeout(questionTimer)
    }

    questionTimer = setTimeout(handleQuestionTimeout, TIMER_SECONDS * 1000)
}

const handleQuestionTimeout = () => {
    io.emit('update_status', 'show_correct')
    io.emit('timer_up')

    setTimeout(() => {
        if (questionCount > Object.keys(triviaQuestions).length -1) {
            io.emit('update_status', 'ended')
            clearTimeout(questionTimer)
            return
        }

        sendQuestion()
    }, 2000)
    
}

const fetchQuestions = async () => {
    const text = getPrompt(NUMBER_OF_QUESTIONS, categories.join(', '))
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
            'x-goog-api-key': GEMINI_API_KEY,
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

io.on('connection', (socket: Socket) => {
    console.log(`A user connected: ${socket.id}`)

    socket.on('send_username', (name: string) => {
        players.set(name, { id: socket.id, name })
        console.log(`Player ${name} (${socket.id}) joined`)

        const playerList = Array.from(players.values())
        io.emit('update_players', playerList)
        io.emit('update_status', 'lobby')
    })
    
    socket.on('start_game', async () => {
        io.emit('update_status', 'loading')
        triviaQuestions = await fetchQuestions()
        availableQuestions = [...triviaQuestions]
        io.emit('update_status', 'show_question')
        sendQuestion()
    })

    socket.on('change_category', (newCategories: string[]) => {
        categories = newCategories
        io.emit('update_categories', newCategories)
    })

    socket.on('restart_game', () => {
        triviaQuestions = []
        availableQuestions = []
        questionCount = 0
        questionTimer = undefined
        playerAnswers = {}

        io.emit('update_status', 'join')
    })

    socket.on('submit_answer', (data: SubmitAnswer) => {
        const question = triviaQuestions.find((value) => value.id === data.questionId)

        if (!playerAnswers[data.player]) {
            playerAnswers[data.player] = {}
        }

        const isCorrect = question?.correct_answer === data.usersAnswer
        playerAnswers[data.player][data.questionId] = isCorrect

        io.emit('update_player_scores', playerAnswers)
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})