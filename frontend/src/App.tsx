import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { GameState } from './types'
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

const initialGameState: GameState = {
  players: [],
  playerId: null,
  hostId: null,
  viewState: 'join',
  question: null,
  phaseDuration: 0,
  phaseStartAt: 0,
  answerSubmissions: {},
  categories: [],
}

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const changeCategory = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategories = Array.from(
        event.target.selectedOptions,
        (option) => option.value,
      )
      setSelectedCategories(selectedCategories)
    },
    [],
  )

  const selectAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswer = event.currentTarget.value

      socket.emit('submit_answer', newAnswer)
    },
    [],
  )

  const joinGame = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    socket.emit('send_username', formData.get('username'))
  }, [])

  const startGame = useCallback(() => {
    socket.emit('start_game', selectedCategories)
  }, [selectedCategories])

  const timeRemaining = useRemainingTime(
    gameState.phaseStartAt,
    gameState.phaseDuration,
  )

  const restartGame = useCallback(() => {
    socket.emit('restart_game')
    setGameState(initialGameState)
  }, [])

  useEffect(() => {
    socket.on('game_state_changed', (gameState: GameState) => {
      setGameState(gameState)
    })
  }, [])

  if (gameState.viewState === 'join') {
    return <JoinView onJoin={joinGame} />
  }

  if (gameState.viewState === 'lobby') {
    return (
      <LobbyView
        categories={gameState.categories}
        players={gameState.players}
        onStartGame={startGame}
        onChangeCategory={changeCategory}
      />
    )
  }

  if (gameState.viewState === 'question' && gameState.question) {
    return (
      <QuestionView
        timeRemaining={timeRemaining}
        question={gameState.question}
        onSelectAnswer={selectAnswer}
      />
    )
  }

  if (gameState.viewState === 'answer' && gameState.question) {
    return (
      <AnswerView
        timeRemaining={timeRemaining}
        players={gameState.players}
        answerSubmissions={gameState.answerSubmissions}
        question={gameState.question}
      />
    )
  }

  if (gameState.viewState === 'end') {
    return <EndView players={gameState.players} onRestart={restartGame} />
  }
}
