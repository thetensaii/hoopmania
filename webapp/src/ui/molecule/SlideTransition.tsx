import type React from "react"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { css } from "../../../styled-system/css"
import { useRef } from "react"

const styles = css.raw({
  position: 'absolute',
  w: 'full',
  h: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  translate: 'auto',
})

const slideStyles = css.raw({
  ['&.slide-enter']: {
    x: '-full',
    opacity: 0
  },
  ['&.slide-enter-active']: {
    transition: 'all',
    transitionDuration: "0.3s",
    opacity: 1,
    x: '[0]'
  },
  ['&.slide-exit']: {
    x: '[0]',
    opacity: 1
  },
  ['&.slide-exit-active']: {
    transition: 'all',
    transitionDuration: "0.3s",
    opacity: 0,
    x: '-full'
  },
})

type Props = {
  id: string
  children: React.ReactNode
}

export const SlideTransition = ({ id, children }: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <SwitchTransition>
      <CSSTransition
        key={id}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          if (nodeRef.current)
            nodeRef.current.addEventListener("transitionend", done, false);
        }}
        classNames='slide'
      >
        <div ref={nodeRef} className={css(styles, slideStyles)}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}