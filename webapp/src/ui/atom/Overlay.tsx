import { css } from "../../../styled-system/css"


const overlayStyles = css({
  position: 'absolute',
  w: 'full',
  h: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'auto',
  bg: 'darkBlue.900/80',
  transition: "all",
  transitionDuration: "0.3s",
  translate: 'auto',
  ['&[data-visible="false"]']: {
    y: '-full',
  }
})


type Props = {
  visible: boolean
  children: React.ReactNode
}

export const Overlay = ({ visible, children }: Props) => {

  return (
    <div
      data-visible={visible}
      className={overlayStyles}
    >
      {children}
    </div>
  )
}