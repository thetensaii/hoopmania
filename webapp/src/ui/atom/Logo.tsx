import { css } from "../../../styled-system/css"

export const Logo = () => {
  return (
    <h1 className={css({
      mb: '1rem',
      fontSize: '3.5rem',
      fontWeight: 'bolder',
      color: 'orange.300',
      textShadow: 'bigTextBorder'
    })}>
      HOOPMANIA
    </h1>
  )
}