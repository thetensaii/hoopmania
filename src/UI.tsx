import { useGameState } from "./GameState"
import { useIsGameEnded } from "./hooks/useIsGameEnded"
import { getTimeLeftInSec } from "./utils"

export const UI = () => {
  const score = useGameState((state) => state.score)
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const currentTime = useGameState((state) => state.currentTime)
  const isGameEnded = useIsGameEnded()

  return <div id="ui-container" className={isGameEnded ? "active" : ""}>
    <h2 style={{ textAlign: 'center' }}>Score : {score}</h2>
    <h2 style={{ textAlign: 'center' }}>Timer : {Math.max(0, getTimeLeftInSec(lastBucketTime, currentTime)).toFixed(2)}</h2>
    {isGameEnded && <p style={{ textAlign: 'center', fontSize: "4rem" }}>GAME OVER</p>}
  </div>
}