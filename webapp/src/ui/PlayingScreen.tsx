import { useEffect, useState } from "react"
import { useGameState } from "../stores/GameState"
import { getTimeLeftInSec } from "../utils"
import { css } from "../../styled-system/css"
import { ClockIcon } from "./atom/icons/ClockIcon"

export const PlayingScreen = () => {
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(Math.max(0, getTimeLeftInSec(lastBucketTime, Date.now())))
    }, 10)

    return () => {
      clearInterval(intervalId)
    }
  }, [lastBucketTime])

  return (
    <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', bg: 'darkBlue.500/30' })}>
      <ClockIcon fillPercent={timeLeft / 10 * 100} />
      <p className={css({
        textAlign: 'center', fontSize: '2rem', color: 'white'
      })}>
        {timeLeft.toFixed(2)}
      </p>
    </div >
  )
}