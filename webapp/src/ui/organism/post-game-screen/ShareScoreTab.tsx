import type { FormEventHandler } from "react"
import { track } from "@plausible-analytics/tracker"
import { css } from "../../../../styled-system/css"
import { useGameState } from "../../../stores/GameState"
import { usePostGameScreenState } from "../../../stores/PostGameScreenState"
import { Button } from "../../atom/Button"
import { Input } from "../../atom/Input"
import { MenuContainer } from "../../atom/MenuContainer"
import { useShareScore } from "../../../hooks/useShareScore"
import { useFindGuestName } from "../../../hooks/guest-name/useFindGuestName"
import { Typography } from "../../atom/Typography"

export const ShareScoreTab = () => {
  const { setTab } = usePostGameScreenState()
  const { score, startTime, endTime } = useGameState()
  const { isPending, name } = useFindGuestName()

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

    track('guest-shared-score', {})
    setTab('main')
  }

  if (isPending) {
    return <h1>LOADING...</h1>
  }

  return (
    <MenuContainer styles={css.raw({ gap: '1rem' })}>
      <Typography component="h1" variant="heading1">HOOPMANIA</Typography>
      <Typography variant="heading3">Score : {score}</Typography>
      <form className={css({ display: "flex", flexDir: 'column', gap: '1rem', w: 'full' })} onSubmit={handleSubmit}>
        <Input name="name" label="Enter your name" defaultValue={name ?? undefined} />
        <div className={css({ w: 'full', mt: '[1.5rem]', display: "flex", gap: '1rem' })}>
          <Button size='medium' onClick={() => setTab('main')}>BACK</Button>
          <Button type='submit' visual="accent">Share</Button>
        </div>
      </form>
    </MenuContainer >
  )
}