import { css } from "../../styled-system/css"
import { Basketball } from "./atom/icons/Basketball"

export const UiLoadingScreen = () => {
  return (
    <div
      className={css({
        position: 'absolute',
        top: 0,
        left: 0,
        w: 'full',
        h: 'full',
        bg: 'blue.700',

        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Basketball styles={css.raw({ animation: 'rotate linear 1500ms infinite' })} />
      <p className={css({ textAlign: 'center', fontSize: '[3rem]' })}>LOADING...</p>
    </div>
  )
}