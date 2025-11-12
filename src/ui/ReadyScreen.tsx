import { useGameState } from "../GameState"

export const ReadyScreen = () => {
  const startNewGame = useGameState((state) => state.startNewGame)
  const bestScore = useGameState((state) => state.bestScore)

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
      {bestScore !== undefined &&
        <div>
          <p style={{ textAlign: 'center', fontSize: "2rem" }}>BEST SCORE</p>
          <p style={{ textAlign: 'center', fontSize: "4rem" }}>{bestScore}</p>
        </div>
      }
      <button onClick={startNewGame} style={{ fontSize: '2rem', height: 'fit-content' }}>START</button>
    </div>
  )
}