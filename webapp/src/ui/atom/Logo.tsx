import { css } from "../../../styled-system/css"

export const Logo = () => {
  return (
    <h1 className={css({
      mb: '1rem',
      fontSize: '3.5rem',
      fontWeight: 'bolder',
      color: 'orange.300',
      textShadow: `2px 0 token(colors.darkBlue.900), 
                  -2px 0 token(colors.darkBlue.900), 
                  0 2px token(colors.darkBlue.900), 
                  0 -2px token(colors.darkBlue.900),
                  1px 1px token(colors.darkBlue.900), 
                  -1px -1px token(colors.darkBlue.900), 
                  1px -1px token(colors.darkBlue.900), 
                  -1px 1px token(colors.darkBlue.900)`
    })}>
      HOOPMANIA
    </h1>
  )
}