import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { GameState, Settings } from './types'
import { Spinner } from './components'
import {
  JoinView,
  LobbyView,
  QuestionView,
  AnswerView,
  EndView,
} from './views'

import './styles.css'

const socket = io('http://localhost:3000')

export const App = () => {
  const [gameState, setGameState] = useState<GameState>()
  const [playerId, setPlayerId] = useState<string>()
  const [username, setUsername] = useState<string>()

  const changeSettings = useCallback((settings: Partial<Settings>) => {
    if (settings.selectedCategories) {
      socket.emit('change_category', settings.selectedCategories)
    }

    if (settings.numberOfQuestions) {
      socket.emit('change_number_of_questions', settings.numberOfQuestions)
    }

    if (settings.questionPhaseDuration) {
      socket.emit(
        'change_question_phase_duration',
        settings.questionPhaseDuration,
      )
    }
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

  const restartGame = useCallback(() => {
    socket.emit('restart_game')
  }, [])

  useEffect(() => {
    socket.on('set_player_id', ({ id }) => {
      setPlayerId(id)
    })

    socket.on('game_state_changed', (gameState: GameState) => {
      setGameState(gameState)
    })
  }, [])

  if (!gameState || gameState.viewState === 'loading') {
    return <Spinner />
  }

  if (!username) {
    return <JoinView onJoin={joinGame} />
  }

  if (username && gameState.viewState === 'lobby') {
    return (
      <LobbyView
        playerId={playerId}
        categories={gameState.categories}
        players={gameState.players}
        settings={gameState.settings}
        onChangeSettings={changeSettings}
        onStartGame={startGame}
      />
    )
  }

  if (playerId && gameState.question && gameState.viewState === 'question') {
    return (
      <QuestionView
        phaseDuration={gameState.settings.questionPhaseDuration}
        phaseStartAt={gameState.phaseStartAt}
        question={gameState.question}
        selectedAnswer={gameState.answerSubmissions[playerId]}
        numberOfQuestions={gameState.settings.numberOfQuestions}
        onSelectAnswer={selectAnswer}
      />
    )
  }

  if (playerId && gameState.question && gameState.viewState === 'answer') {
    return (
      <AnswerView
        playerId={playerId}
        phaseDuration={gameState.settings.answerPhaseDuration}
        phaseStartAt={gameState.phaseStartAt}
        players={gameState.players}
        answerSubmissions={gameState.answerSubmissions}
        question={gameState.question}
        numberOfQuestions={gameState.settings.numberOfQuestions}
      />
    )
  }

  if (gameState.viewState === 'end') {
    return <EndView players={gameState.players} onRestart={restartGame} />
  }
}
