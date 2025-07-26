import { useGameState } from "./GameState"

export const UI = () => {
  const score = useGameState((state) => state.score)

  return <div id="ui-container">
    <h2 style={{ textAlign: 'center' }}>Score : {score}</h2>
  </div>
}