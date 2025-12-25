import type React from "react"
import { css } from "../../../styled-system/css"

const styles = css({
  p: '2rem',
  bg: 'blue.500',
  borderRadius: '12px',
  borderColor: 'darkBlue.900',
  borderWidth: 'thick',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  w: '80%',
  maxW: '400px'
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