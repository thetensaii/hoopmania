import { useId } from "react"
import { css } from "../../../styled-system/css"
import { Typography } from "./Typography"

const styles = css({
  w: 'full',
  bg: 'container.inverted',
  color: 'text.inverted',
  borderRadius: 'lg',
  fontSize: 'text.heading4',
  paddingLeft: 'md',
  paddingY: 'xxs',
  borderColor: 'border.default',
  borderWidth: 'medium'
})

type Props = {
  name: string,
  label?: string,
  defaultValue?: string
}

export const Input = ({ name, label, defaultValue }: Props) => {
  const id = useId();
  return (
    <div className={css({ w: 'full', display: 'flex', flexDirection: 'column' })}>
      <Typography component="label" htmlFor={id}>{label}</Typography>
      <input className={styles} id={id} name={name} defaultValue={defaultValue} />
    </div>
  )
}