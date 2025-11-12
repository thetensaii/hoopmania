import { useGameState } from "../GameState"

export const EndingScreen = () => {
  const startNewGame = useGameState((state) => state.startNewGame)
  const score = useGameState((state) => state.score)

  return (
    <>
      <div style={{ marginTop: "30vh", display: "flex", flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ textAlign: 'center', fontSize: "3rem" }}>GAME OVER</p>
        <p style={{ textAlign: 'center', fontSize: "2rem" }}>FINAL SCORE</p>
        <p style={{ textAlign: 'center', fontSize: "4rem" }}>{score}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}><button onClick={startNewGame} style={{ fontSize: '2rem' }}>RESTART</button></div>
      </div>
    </>
  )
}