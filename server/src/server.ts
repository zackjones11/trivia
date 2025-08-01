import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'

import { fetchQuestions } from './game/fetchQuestions'
import { pickRandomQuestion, createGameState } from './game/state'

import type { SubmitAnswer } from './types'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3000

const TIMER_SECONDS = 5

let {
  categories,
  triviaQuestions,
  availableQuestions,
  questionCount,
  players,
  socketIdToName,
  playerAnswers,
  questionTimer,
} = createGameState()

const sendQuestion = () => {
  io.emit('update_status', 'show_question')
  io.emit('new_question', pickRandomQuestion(availableQuestions, questionCount))

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
    if (questionCount > Object.keys(triviaQuestions).length - 1) {
      io.emit('update_status', 'ended')
      clearTimeout(questionTimer)
      return
    }

    sendQuestion()
  }, 2000)
}

io.on('connection', (socket: Socket) => {
  console.log(`A user connected: ${socket.id}`)

  socket.on('send_username', (name: string) => {
    players.set(name, { id: socket.id, name })
    socketIdToName.set(socket.id, name)
    console.log(`Player ${name} (${socket.id}) joined`)

    const playerList = Array.from(players.values())
    io.emit('update_players', playerList)
    io.emit('update_status', { name, status: 'lobby' })
  })

  socket.on('start_game', async () => {
    io.emit('update_status', 'loading')
    triviaQuestions = await fetchQuestions(categories)
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
    players = new Map()
    playerAnswers = {}

    io.emit('update_status', 'lobby')
    io.emit('update_player_scores', {})
  })

  socket.on('submit_answer', (data: SubmitAnswer) => {
    const question = triviaQuestions.find(
      (value) => value.id === data.questionId,
    )

    if (!playerAnswers[data.player]) {
      playerAnswers[data.player] = {}
    }

    const isCorrect = question?.correct_answer === data.usersAnswer
    playerAnswers[data.player][data.questionId] = isCorrect

    io.emit('update_player_scores', playerAnswers)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)

    const name = socketIdToName.get(socket.id)

    if (name) {
      players.delete(name)
      socketIdToName.delete(socket.id)
      console.log(`Removed player: ${name}, ${players}`)
    }

    const playerList = Array.from(players.values())
    delete playerAnswers[name]

    io.emit('update_players', playerList)
    io.emit('update_player_scores', playerAnswers)
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
