import styles from './Countdown.module.css'

type Props = { seconds: number; totalTime: number };

export const Countdown = ({ seconds, totalTime }: Props) => {
  const radius = 29
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(1, seconds / totalTime))
  const dashOffset = circumference * (1 - progress)

  return (
    <div className={styles.container}>
      <svg width="64" height="64" className={styles.svg}>
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="rgb(31,41,55)"
          strokeWidth="6"
        />

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="rgb(99,102,241)"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.secondsContainer}>
        <div className={styles.seconds}>{seconds}</div>
      </div>
    </div>
  )
}
