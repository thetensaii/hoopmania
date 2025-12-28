import type React from "react"
import { cva, type RecipeVariant, } from "../../../styled-system/css"

const button = cva({
  base: {
    borderRadius: '8px',
    cursor: 'pointer',
    w: 'full',
  },
  variants: {
    size: {
      medium: {
        borderWidth: 'medium',
        fontSize: '1.5rem',
        py: '0.25rem',
        px: '1rem',
      },
      big: {
        borderWidth: 'medium',
        fontSize: '2rem',
        fontWeight: 'bold',
        py: '0.5rem',
        px: '1.5rem',
      }
    },
    visual: {
      primary: {
        bg: 'orange.500',
        color: 'white',
        borderColor: 'darkBlue.900',
        _hover: {
          bg: 'orange.600'
        },
        _active: {
          bg: 'orange.700'
        }
      },
      secondary: {
        color: 'white',
        borderColor: 'white',
        _hover: {
          bg: 'blue.400'
        },
        _active: {
          bg: 'blue.600'
        }
      }
    },
    animation: {
      pulse: {
        animation: 'pulse 700ms infinite',
      }
    }
  },
  defaultVariants: {
    size: 'medium',
    visual: 'primary',
  }
})
type ButtonVariants = RecipeVariant<typeof button>
type Props = {
  type?: HTMLButtonElement['type']
  onClick?: () => void
  size?: ButtonVariants['size'],
  visual?: ButtonVariants['visual'],
  animation?: ButtonVariants['animation'],
  children: React.ReactNode
}

export const Button = ({ type = 'button', onClick, children, size, visual, animation }: Props) => {
  return (
    <button type={type} onClick={onClick} className={button({ size, visual, animation })}>
      {children}
    </button>
  )
}