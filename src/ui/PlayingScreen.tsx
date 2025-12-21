import { useEffect, useState } from "react"
import { useGameState } from "../GameState"
import { getTimeLeftInSec } from "../utils"

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
    <>
      <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>Score : {score}</h2>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', color: timeLeft < 3 ? "red" : "inherit" }}>Timer : {timeLeft.toFixed(2)}</h2>
    </>
  )
}