import { css } from "../../styled-system/css"
import { Basketball } from "./atom/icons/Basketball"
import { Typography } from "./atom/Typography"

export const UILoadingOverlay = () => {
  return (
    <div
      className={css({
        position: 'absolute',
        top: 0,
        left: 0,
        w: 'full',
        h: 'full',
        bg: 'container.default',

        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Basketball styles={css.raw({ animation: 'rotate linear 1500ms infinite' })} />
      <Typography variant="heading3" cssRaw={css.raw({ textAlign: 'center' })}>LOADING...</Typography>
    </div>
  )
}