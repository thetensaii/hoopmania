import { useGameState } from "../GameState"
import { getTimeLeftInSec } from "../utils"

export const PlayingScreen = () => {
  const score = useGameState((state) => state.score)
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const currentTime = useGameState((state) => state.currentTime)

  const timeLeft = Math.max(0, getTimeLeftInSec(lastBucketTime, currentTime))

  return (
    <>
      <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>Score : {score}</h2>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', color: timeLeft < 3 ? "red" : "inherit" }}>Timer : {timeLeft.toFixed(2)}</h2>
    </>
  )
}