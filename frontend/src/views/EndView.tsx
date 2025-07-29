import type { PlayerScores } from '../types'

type Props = {
  scores: PlayerScores;
  onRestart: () => void;
};

export const EndView = ({ scores, onRestart }: Props) => {
  return (
    <>
      <h1>Game over</h1>

      <ul>
        {Object.entries(scores).map(([name, scores]) => {
          return (
            <li>
              {name}:{' '}
              {
                Object.entries(scores).filter(([, value]) => value === true)
                  .length
              }
              /{Object.entries(scores).length}
            </li>
          )
        })}
      </ul>

      <button onClick={onRestart}>Restart</button>
    </>
  )
}
