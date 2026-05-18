import { useEffect, useState } from "react"
import { useGameState } from "../stores/GameState"


const ALLOWED_TIME_BETWEEN_BUCKET_IN_MS = 10_000

export const getTimeLeftInSec = (lastBucketTime: number, currentTime: number) => {
  return (ALLOWED_TIME_BETWEEN_BUCKET_IN_MS - (currentTime - lastBucketTime)) / 1_000
}

export const useGetTimeLeftInSec = () => {
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeInSec = Math.max(0, getTimeLeftInSec(lastBucketTime, Date.now()))
      const ceiledTime = Math.ceil(timeInSec)

      setTimeLeft(ceiledTime)
    }, 10)

    return () => {
      clearInterval(intervalId)
    }
  }, [lastBucketTime])

  return timeLeft
}