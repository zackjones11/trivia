import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type {
  Player,
  Status,
  Question,
  GameState,
} from './types'
import {
  JoinView,
  LobbyView,
  QuestionView,
  AnswerView,
  EndView,
} from './views'

import './App.module.css'

const socket = io('http://localhost:3000')

export const App = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>()
  const [currentUsername, setCurrentUsername] = useState<string>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('join')
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const changeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategories = Array.from(
        event.target.selectedOptions,
        (option) => option.value,
      )

      socket.emit('change_category', selectedCategories)
    },
    [],
  )

  const selectAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswer = event.currentTarget.value

      setCurrentAnswer(newAnswer)
    },
    [],
  )

  const joinGame = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      socket.emit('send_username', currentUsername)
    },
    [currentUsername],
  )

  const startGame = useCallback(() => {
    socket.emit('start_game')
  }, [])

  const restartGame = useCallback(() => {
    socket.emit('restart_game')
    setSelectedCategories([])
    setCurrentAnswer(undefined)
    setCurrentQuestion(undefined)
  }, [])

  useEffect(() => {
    socket.on('timer_up', () => {
      socket.emit('submit_answer', { usersAnswer: currentAnswer })
    })
  }, [currentAnswer])

  useEffect(() => {
    socket.on('game_state_changed', (gameState: GameState) => {
      setStatus(gameState.viewState)
      setPlayers(gameState.players)
      setCurrentQuestion(gameState.question)
      console.log(gameState)
    })
  }, [])

  if (status === 'join') {
    return <JoinView onJoin={joinGame} onChange={setCurrentUsername} />
  }

  if (status === 'lobby') {
    return (
      <LobbyView
        selectedCategories={selectedCategories}
        players={players}
        onStartGame={startGame}
        onChangeCategory={changeCategory}
      />
    )
  }

  if (status === 'question' && currentQuestion) {
    return (
      <QuestionView
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onSelectAnswer={selectAnswer}
      />
    )
  }

  if (status === 'answer' && currentQuestion) {
    return (
      <AnswerView question={currentQuestion} selectedAnswer={currentAnswer} />
    )
  }

  if (status === 'end') {
    return <EndView players={players} onRestart={restartGame} />
  }
}
