import type { ReactNode } from "react"
import { css } from "../../../styled-system/css"

type Props = {
  children: ReactNode
}

export const Title = ({ children }: Props) => {
  return (

    <h1 className={css({
      mb: '1rem',
      fontSize: '2.5rem',
      fontWeight: 'bolder',
      color: 'white',
      textShadow: 'bigTextBorder'
    })}>
      {children}
    </h1>
  )
}