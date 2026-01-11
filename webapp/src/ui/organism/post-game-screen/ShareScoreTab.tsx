import type { FormEventHandler } from "react"
import { css } from "../../../../styled-system/css"
import { useGameState } from "../../../stores/GameState"
import { usePostGameScreenState } from "../../../stores/PostGameScreenState"
import { Button } from "../../atom/Button"
import { Input } from "../../atom/Input"
import { Logo } from "../../atom/Logo"
import { MenuContainer } from "../../atom/MenuContainer"
import { usePlayerName } from "../../../hooks/usePlayerName"
import { useShareScore } from "../../../hooks/useShareScore"

export const ShareScoreTab = () => {
  const { setTab, setHasSharedScore } = usePostGameScreenState()
  const { score, playerName, startTime, endTime } = useGameState()
  const { savePlayerName } = usePlayerName()
  const mutation = useShareScore()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const player = formData.get("name")?.toString().trim()
    const time = endTime - startTime

    if (!player || player.length === 0) {
      return
    }

    const game = { player, score, time }

    await mutation.mutateAsync(game)
    await savePlayerName(player)
    setHasSharedScore(true)
    setTab('main')
  }

  return (
    <MenuContainer>
      <form className={css({ display: "flex", flexDir: 'column', gap: '1rem' })} onSubmit={handleSubmit}>
        <Logo />
        <p className={css({ textAlign: 'center', fontSize: "2rem" })}>Score : {score}</p>
        <Input name="name" label="Enter your name" defaultValue={playerName} />
        <div className={css({ w: 'full', mt: '[1.5rem]', display: "flex", gap: '1rem' })}>
          <Button visual='secondary' size='medium' onClick={() => setTab('main')}>BACK</Button>
          <Button type='submit' visual='primary'>Share</Button>
        </div>
      </form>
    </MenuContainer >
  )
}