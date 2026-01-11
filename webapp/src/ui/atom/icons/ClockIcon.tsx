import type React from "react"
import { css } from "../../../../styled-system/css"
import type { SystemStyleObject } from "../../../../styled-system/types"


type Props = {
  size?: SystemStyleObject['w'] & SystemStyleObject['h']
  fillPercent?: number
}

export const ClockIcon = ({ size = `[2rem]`, fillPercent = 100 }: Props) => {
  const filledDeg = 360 * fillPercent / 100

  return <svg
    className={css({
      w: size,
      h: size,
    })}
    viewBox="0 0 100 100"
  >
    <circle cx={50} cy={50} r={45} className={css({ fill: '[none]', stroke: 'white', strokeWidth: 5 })} />
    <circle cx={50} cy={50} r={35}
      className={css({
        fill: 'white',
        maskImage: `conic-gradient(transparent calc(360deg - var(--timer-angle)), black calc(360deg - var(--timer-angle)) var(--timer-angle))`,
      })}
      style={{
        '--timer-angle': `${filledDeg}deg`
      } as React.CSSProperties} />
  </svg>
}