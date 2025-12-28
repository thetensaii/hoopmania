import type React from "react"
import { css } from "../../../styled-system/css"

const styles = css({
  w: '80%',
  maxW: '400px',
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
  children: React.ReactNode
}

export const MenuContainer = ({ children }: Props) => {

  return (
    <div className={styles}>
      {children}
    </div>
  )
}