import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { Player, Status, Question, GameState } from './types'
import {
  JoinView,
  LobbyView,
  QuestionView,
  AnswerView,
  EndView,
} from './views'

import './App.module.css'
import { useRemainingTime } from './useRemainingTime'

const socket = io('http://localhost:3000')

export const App = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>()
  const [currentUsername, setCurrentUsername] = useState<string>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('join')
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const [phaseDuration, setPhaseDuration] = useState(0)
  const [phaseStartAt, setPhaseStartAt] = useState(0)
  const [answerSubmissions, setAnswerSubmissions] = useState({})
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

      socket.emit('submit_answer', newAnswer)
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

  const timeRemaining = useRemainingTime(phaseStartAt, phaseDuration)

  const restartGame = useCallback(() => {
    socket.emit('restart_game')
    setSelectedCategories([])
    setCurrentAnswer(undefined)
    setCurrentQuestion(undefined)
    setPhaseDuration(0)
    setPhaseStartAt(0)
    setAnswerSubmissions({})
  }, [])

  useEffect(() => {
    socket.on('game_state_changed', (gameState: GameState) => {
      setStatus(gameState.viewState)
      setPlayers(gameState.players)
      setCurrentQuestion(gameState.question)
      setPhaseDuration(gameState.phaseDuration)
      setPhaseStartAt(gameState.phaseStartAt)
      setAnswerSubmissions(gameState.answerSubmissions)
      console.log(gameState)
    })
  }, [])

  console.log('timeRemaining', timeRemaining)

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
      <AnswerView players={players} answerSubmissions={answerSubmissions} question={currentQuestion} selectedAnswer={currentAnswer} />
    )
  }

  if (status === 'end') {
    return <EndView players={players} onRestart={restartGame} />
  }
}
