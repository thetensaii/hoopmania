import type React from "react"
import { cva, type RecipeVariant, } from "../../../styled-system/css"

const button = cva({
  base: {
    borderRadius: '8px',
    borderWidth: 'medium',
    cursor: 'pointer',
    w: 'full',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  variants: {
    size: {
      medium: {
        fontSize: 'text.heading4',
        py: '0.25rem',
        px: '1rem',
      },
      big: {
        fontSize: 'text.heading3',
        fontWeight: 'highlight',
        py: '0.5rem',
        px: '1.5rem',
      }
    },
    visual: {
      accent: {
        bg: 'interaction.accent.default',
        color: 'text.default',
        borderColor: 'border.default',
        _hover: {
          bg: 'interaction.accent.hover'
        },
        _active: {
          bg: 'interaction.accent.active'
        }
      },
      primary: {
        color: 'text.default',
        bg: 'interaction.secondary.default',
        borderColor: 'border.inverted',
        _hover: {
          bg: 'interaction.secondary.hover'
        },
        _active: {
          bg: 'interaction.secondary.active'
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