import { useEffect, useState } from "react"
import { useGameState } from "../stores/GameState"
import { getTimeLeftInSec } from "../utils"
import { css } from "../../styled-system/css"
import { ClockIcon } from "./atom/icons/ClockIcon"
import { Typography } from "./atom/Typography"

const styles = css({
  position: 'fixed',
  top: 0,
  w: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  bg: 'container.default',
  ['&[data-visible="false"]']: {
    display: 'none'
  }
})

type Props = {
  visible: boolean
}

export const HUD = ({ visible }: Props) => {
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(Math.max(0, getTimeLeftInSec(lastBucketTime, Date.now())))
    }, 10)

    return () => {
      clearInterval(intervalId)
    }
  }, [lastBucketTime])

  return (
    <div
      data-visible={visible}
      className={styles}
    >
      <ClockIcon fillPercent={timeLeft / 10 * 100} />
      <Typography variant="heading3" cssRaw={css.raw({ textAlign: "center" })}>{timeLeft.toFixed(2)}</Typography>
    </div >
  )
}