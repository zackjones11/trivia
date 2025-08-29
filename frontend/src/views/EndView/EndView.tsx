import { useCallback, useMemo, useState } from 'react'
import { PlayerList } from '../../components'
import { Layout } from '../../components'
import type { AnswerSubmissions, Player, Question } from '../../types'

import styles from './EndView.module.css'
import { RecapPopup } from './components'

type Props = {
  numberOfQuestions: number;
  questions: Question[];
  answerSubmissions: AnswerSubmissions;
  players: Player[];
  onRestart: () => void;
};

const gifs = [
  'https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif',
  'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
  'https://media4.giphy.com/media/lC69bczh51rZldSyA5/giphy.gif',
  'https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif',
  'https://media.giphy.com/media/kAUtsLfsEfqaJRwe80/giphy.gif',
  'https://media.giphy.com/media/fFd3HoAlKODowKQkwC/giphy.gif',
  'https://media.giphy.com/media/vNr3DRaqTZ6mWYfXv0/giphy.gif',
  'https://media.giphy.com/media/VEsfbW0pBu145PPhOi/giphy.gif',
  'https://media.giphy.com/media/gkpnGTiy8Sq08/giphy.gif',
  'https://media.giphy.com/media/huyVJYSKcArLiu8J5g/giphy.gif',
  'https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif',
  'https://media1.giphy.com/media/Ju7l5y9osyymQ/giphy.gif'
]

export const EndView = ({
  questions,
  answerSubmissions,
  numberOfQuestions,
  players,
  onRestart,
}: Props) => {
  const [showRecap, setShowRecap] = useState<number>()

  const playersSorted = useMemo(
    () => players.sort((a, b) => b.score - a.score),
    [players],
  )

  const toggleRecap = useCallback(
    (index: number) => {
      if (index === showRecap) {
        setShowRecap(undefined)
        return
      }

      setShowRecap(index)
    },
    [showRecap],
  )

  const randomGif = useMemo(
    () => gifs[Math.floor(Math.random() * gifs.length)],
    [gifs],
  )

  return (
    <Layout>
      <header className={styles.header}>
        <button className={styles.button} onClick={onRestart}>
          New Game
        </button>
      </header>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.headline}>Winner</div>
          <span>👑 {playersSorted[0].username}</span>
          <img src={randomGif} alt="celebration" className={styles.gif} />
        </div>

        <div className={styles.right}>
          <div className={styles.headline}>Leaderboard</div>

          <PlayerList
            players={playersSorted}
            endContent={({ id, score }, index) => (
              <div className={styles.playerEndContent}>
                <button
                  className={styles.recapButton}
                  onClick={() => toggleRecap(index)}
                >
                  {showRecap === index ? 'Hide' : 'Show'} recap
                </button>

                <span className={styles.score}>
                  {score}/{numberOfQuestions}
                </span>

                {showRecap === index && (
                  <RecapPopup
                    questions={questions}
                    playerAnswers={answerSubmissions[id]}
                  />
                )}
              </div>
            )}
          />
        </div>
      </div>
    </Layout>
  )
}
