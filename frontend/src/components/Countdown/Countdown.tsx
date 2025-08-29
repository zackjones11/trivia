import { useEffect, useRef } from 'react'
import styles from './Countdown.module.css'

type Props = { seconds: number; totalTime: number; useBeep?: boolean };

const radius = 29
const circumference = 2 * Math.PI * radius
const timeRunningOutThreshold = 0.35

const playBeep = ({ frequencyValue }: { frequencyValue: number }) => {
  const ctx = new window.AudioContext()

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = frequencyValue
  gain.gain.value = 0.3
  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.1)
  oscillator.onended = () => ctx.close()
}

export const Countdown = ({ seconds, totalTime, useBeep }: Props) => {
  const progress = Math.max(0, Math.min(1, seconds / totalTime))
  const dashOffset = circumference * (1 - progress)
  const fillColor =
    progress < timeRunningOutThreshold ? 'rgb(244,63,94)' : 'rgb(99,102,241)'

  const prevSecondsRef = useRef<number>(seconds)

  useEffect(() => {
    if (!useBeep) {
      return
    }

    if (
      progress <= timeRunningOutThreshold &&
      seconds !== prevSecondsRef.current &&
      seconds > 0
    ) {
      playBeep({ frequencyValue: seconds === 1 ? 800 : 1200 })
    }

    prevSecondsRef.current = seconds
  }, [useBeep, progress, seconds])

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
          stroke={fillColor}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className={styles.animate}
        />
      </svg>

      <div className={styles.secondsContainer}>
        <div className={styles.seconds}>{seconds}</div>
      </div>
    </div>
  )
}
