import styles from "./Button.module.css"

type CallbackFunction = () => void

interface ButtonProps {
  label: string
  onAction: CallbackFunction
  type?: "button" | "submit" | "reset"
}

const Button = ({ label, onAction, type = "button" }: ButtonProps) => {
  return (
    <>
      <button type={type} className={styles.button} onClick={onAction}>
        <span className={styles.button_top}>{label}</span>
      </button>
    </>
  )
}

export default Button
