import type { AllHTMLAttributes } from "react";
import { css, cva, cx, type RecipeVariant, type Styles } from "../../../styled-system/css";

const typography = cva({
  base: {
    color: "text.default"
  },
  variants: {
    variant: {
      heading1: {
        fontSize: 'text.heading1',
        fontWeight: 'highlight',
        color: "text.accent",
        textShadow: 'text.heading'
      },
      heading2: {
        fontSize: 'text.heading2',
        fontWeight: 'highlight',
      },
      heading3: {
        fontSize: 'text.heading3',
      },
      body1: {
        fontSize: "text.body1",
      },
      body2: {
        fontSize: "text.body2",
      }
    },
    outline: {
      body: {
        textShadow: 'text.default'
      },
      heading: {
        textShadow: 'text.heading'
      }
    }
  },
  defaultVariants: {
    variant: "body1"
  }
})
type TypographyVariants = RecipeVariant<typeof typography>

type ComponentType = 'p' | 'div' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'th' | 'td'
type Props = AllHTMLAttributes<HTMLElement> & {
  component?: ComponentType
  variant?: TypographyVariants['variant']
  outline?: TypographyVariants['outline']
  css?: Styles
}

export const Typography = ({ component: Component = 'p', variant, outline, css: overrideCss, children, ...props }: Props) => {

  return (<Component className={cx(typography({ variant, outline }), css(overrideCss))} {...props}>{children}</Component>)
}