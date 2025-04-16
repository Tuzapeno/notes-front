import FormStyle from "@features/login/login.module.css"
import { ChangeEvent } from "react"

interface RequiredInputWithLabelProps {
  label: string
  type: string
  id: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const RequiredInputWithLabel = ({
  label,
  type,
  id,
  onChange = () => {},
}: RequiredInputWithLabelProps) => {
  return (
    <>
      <input
        className={FormStyle.input}
        type={type}
        id={id}
        onChange={onChange}
        placeholder={label}
        required
      />
    </>
  )
}

export default RequiredInputWithLabel
