import type { PlayerScores } from '../types'

type Props = {
  scores: PlayerScores;
  onRestart: () => void;
};

export const EndView = ({ scores, onRestart }: Props) => {
  const scoreCount = Object.entries(scores).reduce<Record<string, number>>(
    (acc, [user, wins]) => {
      return {
        ...acc,
        [user]: Object.values(wins).filter((isWin) => isWin === true).length,
      }
    },
    {},
  )

  const scoreSorted = Object.fromEntries(
    Object.entries(scoreCount).sort((a, b) => b[1] - a[1]),
  )

  const numOfQuestions = Object.values(scores)?.[0]
    ? Object.keys(Object.values(scores)?.[0])?.length
    : 0

  return (
    <>
      <h1>Game over</h1>

      <p>🎊 Well done {Object.keys(scoreSorted)[0]} 🎊</p>

      <ul className="scores">
        {Object.entries(scoreSorted).map(([name, scores]) => {
          return (
            <li>
              {name}: {scores}/{numOfQuestions}
            </li>
          )
        })}
      </ul>

      <button onClick={onRestart}>Restart</button>
    </>
  )
}
