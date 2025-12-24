import type React from "react"
import { cva } from "../../../styled-system/css"

type Props = {
  onClick?: () => void
  children: React.ReactNode
}

const button = cva({
  base: {
    fontSize: '3rem',
    borderRadius: '8px',
    bg: 'orange.500',
    px: '2rem',
    fontWeight: 'bold',
    color: 'white',
    borderColor: 'darkBlue.900',
    borderWidth: 'medium',
    cursor: 'pointer',
    animation: 'pulse 700ms infinite',
    _hover: {
      bg: 'orange.600'
    },
    _active: {
      bg: 'orange.700'
    }

  }
})

export const Button = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={button()}>
      {children}
    </button>
  )
}