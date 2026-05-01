import { css } from "../../../styled-system/css"

export const Logo = () => {
  return (
    <h1 className={css({
      fontSize: '3.5rem',
      fontWeight: 'bolder',
      color: 'text.accent',
      textShadow: 'text.heading'
    })}>
      HOOPMANIA
    </h1>
  )
}