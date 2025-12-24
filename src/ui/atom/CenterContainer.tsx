import type React from "react"
import { css } from "../../../styled-system/css"


const styles = css({
  w: 'full',
  h: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
type Props = {
  children: React.ReactNode
}

export const CenterContainer = ({ children }: Props) => {
  return (
    <div className={styles}>
      {children}
    </div>
  )
}