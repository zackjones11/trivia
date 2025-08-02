import { useEffect, useState } from 'react'

export const useRemainingTime = (
  phaseStartAt: number,
  phaseDuration: number,
) => {
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const end = phaseStartAt + phaseDuration * 1000
      setRemaining(Math.max(0, Math.floor((end - now) / 1000)))
    }

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [phaseStartAt, phaseDuration])

  return remaining
}
