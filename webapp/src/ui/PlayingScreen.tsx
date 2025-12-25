import { useEffect, useState } from "react"
import { useGameState } from "../GameState"
import { getTimeLeftInSec } from "../utils"
import { css } from "../../styled-system/css"

export const PlayingScreen = () => {
  const score = useGameState((state) => state.score)
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
    <div className={css({ bg: 'darkBlue.500/30' })}>
      <p className={css({ textAlign: 'center', fontSize: '2rem' })}>Score : {score}</p>
      <p className={css({ textAlign: 'center', fontSize: '2rem', color: timeLeft < 3 ? "red" : "inherit" })}>Timer : {timeLeft.toFixed(2)}</p>
    </div>
  )
}