import hrefStyle from "./href.module.css"

interface HrefProps {
  href: string
  text: string
}

const Href = ({ href, text }: HrefProps) => {
  return (
    <a href={href} className={hrefStyle.button}>
      <a className={hrefStyle.button_top}>{text}</a>
    </a>
  )
}

export default Href
