import type React from "react"
import { css } from "../../../styled-system/css"
import type { SystemStyleObject } from "../../../styled-system/types"

const menuStyles = css.raw({
  w: '[80%]',
  maxW: '[400px]',
  p: '2rem',

  bg: 'blue.500',
  borderColor: 'darkBlue.900',
  borderRadius: '12px',
  borderWidth: 'thick',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

type Props = {
  styles?: SystemStyleObject
  children: React.ReactNode
}

export const MenuContainer = ({ styles, children }: Props) => {

  return (
    <div className={css(menuStyles, styles)}>
      {children}
    </div>
  )
}