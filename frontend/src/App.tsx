import { useCallback, useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'

import type { GameState } from './types'
import {
  JoinView,
  LobbyView,
  QuestionView,
  AnswerView,
  EndView,
} from './views'
import { useRemainingTime } from './hooks'

import './styles.css'

const socket = io('http://localhost:3000')

const initialGameState: GameState = {
  players: [],
  viewState: 'lobby',
  question: null,
  phaseDuration: 0,
  phaseStartAt: 0,
  numberOfQuestions: 0,
  answerSubmissions: {},
  categories: [],
  selectedCategories: [],
}

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [playerId, setPlayerId] = useState<string>()
  const [username, setUsername] = useState<string>()

  const changeCategory = useCallback((newCategories: string[]) => {
    socket.emit('change_category', newCategories)
  }, [])

  const selectAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newAnswer = event.currentTarget.value
      socket.emit('submit_answer', newAnswer)
    },
    [],
  )

  const joinGame = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newUsername = formData.get('username')

    if (typeof newUsername === 'string') {
      setUsername(newUsername)
      socket.emit('send_username', newUsername)
    }
  }, [])

  const startGame = useCallback(() => {
    socket.emit('start_game')
  }, [])

  const timeRemaining = useRemainingTime(
    gameState.phaseStartAt,
    gameState.phaseDuration,
  )

  const isHost = useMemo(
    () => Boolean(gameState.players.find(({ id }) => id === playerId)?.isHost),
    [gameState.players, playerId],
  )

  const restartGame = useCallback(() => {
    socket.emit('restart_game')
    setGameState(initialGameState)
  }, [])

  useEffect(() => {
    socket.on('set_player_id', ({ id }) => {
      setPlayerId(id)
    })

    socket.on('game_state_changed', (gameState: GameState) => {
      setGameState(gameState)
    })
  }, [])

  if (!username) {
    return <JoinView onJoin={joinGame} />
  }

  if (gameState.viewState === 'loading') {
    return <h1>Loading...</h1>
  }

  if (username && gameState.viewState === 'lobby') {
    return (
      <LobbyView
        isHost={isHost}
        categories={gameState.categories}
        selectedCategories={gameState.selectedCategories}
        players={gameState.players}
        onStartGame={startGame}
        onChangeCategory={changeCategory}
      />
    )
  }

  if (playerId && gameState.viewState === 'question' && gameState.question) {
    return (
      <QuestionView
        timeRemaining={timeRemaining}
        question={gameState.question}
        onSelectAnswer={selectAnswer}
        selectedAnswer={gameState.answerSubmissions[playerId]}
        numberOfQuestions={gameState.numberOfQuestions}
        phaseDuration={gameState.phaseDuration}
      />
    )
  }

  if (playerId && gameState.viewState === 'answer' && gameState.question) {
    return (
      <AnswerView
        playerId={playerId}
        timeRemaining={timeRemaining}
        players={gameState.players}
        answerSubmissions={gameState.answerSubmissions}
        question={gameState.question}
        numberOfQuestions={gameState.numberOfQuestions}
        phaseDuration={gameState.phaseDuration}
      />
    )
  }

  if (gameState.viewState === 'end') {
    return <EndView players={gameState.players} onRestart={restartGame} />
  }
}
