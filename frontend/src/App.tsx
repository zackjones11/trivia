import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

import type { Player, Status, Question, PlayerScores } from './types'
import {
  JoinView,
  LobbyView,
  QuestionView,
  AnswerView,
  EndView,
} from './views'

import './App.module.css'

const socket = io()

export const App = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerScores, setPlayerScores] = useState<PlayerScores>({})
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
    setPlayerScores({})
    setSelectedCategories([])
    setCurrentAnswer(undefined)
    setCurrentQuestion(undefined)
  }, [])

  useEffect(() => {
    socket.on('timer_up', () => {
      if (currentQuestion && currentUsername) {
        socket.emit('submit_answer', {
          questionId: currentQuestion.id,
          usersAnswer: currentAnswer,
          player: currentUsername,
        })
      }
    })
  }, [currentAnswer, currentQuestion, currentUsername])

  useEffect(() => {
    socket.on('update_status', (newStatus: Status) => {
      if (typeof newStatus === 'string') {
        setStatus(newStatus)
        return
      }

      if ('name' in newStatus) {
        if (newStatus.name === currentUsername) {
          setStatus(newStatus.status)
        }
      }
    })

    socket.on('update_players', (newPlayers: Player[]) => {
      setPlayers(newPlayers)
    })

    socket.on(
      'update_player_scores',
      (scores: Record<string, Record<string, boolean>>) => {
        setPlayerScores(scores)
      },
    )

    socket.on('new_question', (question: Question) => {
      setCurrentQuestion(question)
    })

    socket.on('update_categories', (newCategories: string[]) => {
      setSelectedCategories(newCategories)
    })
  }, [currentUsername])

  if (status === 'join') {
    return <JoinView onJoin={joinGame} onChange={setCurrentUsername} />
  }

  if (status === 'lobby' || status === 'loading') {
    return (
      <LobbyView
        isLoading={status === 'loading'}
        selectedCategories={selectedCategories}
        players={players}
        onStartGame={startGame}
        onChangeCategory={changeCategory}
      />
    )
  }

  if (status === 'show_question' && currentQuestion) {
    return (
      <QuestionView
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onSelectAnswer={selectAnswer}
      />
    )
  }

  if (status === 'show_correct' && currentQuestion) {
    return (
      <AnswerView question={currentQuestion} selectedAnswer={currentAnswer} />
    )
  }

  if (status === 'ended') {
    return <EndView scores={playerScores} onRestart={restartGame} />
  }
}
