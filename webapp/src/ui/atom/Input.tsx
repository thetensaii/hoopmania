import { useId } from "react"
import { css } from "../../../styled-system/css"

const styles = css({
  w: 'full',
  bg: 'white',
  color: 'darkBlue.900',
  borderRadius: '8px',
  fontSize: '1.5rem',
  paddingLeft: '1rem',
  paddingY: '0.25rem',
  borderColor: 'darkBlue.900',
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
      <label htmlFor={id}>{label}</label>
      <input className={styles} id={id} name={name} defaultValue={defaultValue} />
    </div>
  )
}