import { useGameState } from "./GameState"
import { useIsGameEnded } from "./hooks/useIsGameEnded"
import { useIsGameReady } from "./hooks/useIsGameReady"
import { getTimeLeftInSec } from "./utils"

export const UI = () => {
  const startNewGame = useGameState((state) => state.startNewGame)
  const score = useGameState((state) => state.score)
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const currentTime = useGameState((state) => state.currentTime)
  const isGameEnded = useIsGameEnded()
  const isGameReady = useIsGameReady()

  return <div id="ui-container" className={isGameReady || isGameEnded ? "active" : ""}>
    <h2 style={{ textAlign: 'center' }}>Score : {score}</h2>
    <h2 style={{ textAlign: 'center' }}>Timer : {Math.max(0, getTimeLeftInSec(lastBucketTime, currentTime)).toFixed(2)}</h2>

    {isGameReady && <>
      <div style={{ display: 'flex', justifyContent: 'center' }}><button onClick={startNewGame} style={{ fontSize: '2rem' }}>START</button></div>
    </>}
    {isGameEnded && <>
      <p style={{ textAlign: 'center', fontSize: "4rem" }}>GAME OVER</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}><button onClick={startNewGame} style={{ fontSize: '2rem' }}>RESTART</button></div>
    </>}
  </div>
}