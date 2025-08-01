import type { Player } from '../types'

type Props = {
  players: Player[];
  onRestart: () => void;
};

export const EndView = ({ players, onRestart }: Props) => {
  const playersSorted = players.sort((a, b) => a.score - b.score)

  return (
    <>
      <h1>Game over</h1>

      <p>🎊 Well done {playersSorted[0].username} 🎊</p>

      <ul className="scores">
        {playersSorted.map(({ username, score }) => {
          return (
            <li>
              {username}: {score}
            </li>
          )
        })}
      </ul>

      <button onClick={onRestart}>Restart</button>
    </>
  )
}
