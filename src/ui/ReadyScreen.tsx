import { useGameState } from "../GameState"

export const ReadyScreen = () => {
  const startNewGame = useGameState((state) => state.startNewGame)

  return (
    <>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}><button onClick={startNewGame} style={{ fontSize: '2rem', height: 'fit-content' }}>START</button></div>
    </>
  )
}