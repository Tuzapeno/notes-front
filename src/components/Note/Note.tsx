import { useState } from "react"
import { useAppDispatch } from "@/app/hooks"
import { removeNote } from "@/features/notes/noteSlice"
import { MdInvertColors } from "react-icons/md"
import Button from "@components/Button/Button"

import noteStyle from "./Note.module.css"

interface NoteProps {
  id?: number
  title: string
  description: string
  date: string
  lastEditDate?: string
  initialColor?: string
}

const availableColors = [
  "lightblue", // Default
  "lightcoral",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
]

// TODO: Adicionar atualizacao na data da ultima edicao
const Note = ({
  id,
  title,
  description,
  date,
  initialColor = "lightblue",
  lastEditDate = new Date().toDateString() +
    " " +
    new Date().toLocaleTimeString(),
}: NoteProps) => {
  const dispatch = useAppDispatch()
  const [editTitle, setEditTitle] = useState<string>(title)
  const [editDescription, setEditDescription] = useState<string>(description)

  const [cardColor, setCardColor] = useState<string>(initialColor)
  const [isDisapearing, setIsDisapearing] = useState<boolean>(false)

  const handleDelete = () => {
    setIsDisapearing(true)
  }

  const handleAnimationEnd = () => {
    if (isDisapearing) {
      dispatch(removeNote(id))
    }
  }

  const handleChangeColor = () => {
    const currentIndex = availableColors.indexOf(cardColor)
    const nextIndex = (currentIndex + 1) % availableColors.length
    setCardColor(availableColors[nextIndex])
  }

  const cardClasses = `${noteStyle.card} ${isDisapearing ? noteStyle.is_disapearing : ""}`

  return (
    <div
      style={{ background: cardColor }}
      onAnimationEnd={handleAnimationEnd}
      className={cardClasses}
    >
      {/* Cabeçalho: Título editável */}
      <div className={noteStyle.card_header}>
        <input
          type="text"
          className={noteStyle.text_title}
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          placeholder={"Digite o título"}
        />
      </div>

      {/* Corpo: Conteúdo textual editável */}
      <div className={noteStyle.card_body}>
        <textarea
          className={noteStyle.text_body}
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
          placeholder="Digite o conteúdo"
        />
      </div>

      {/* Rodapé: Data */}
      <div className={noteStyle.card_footer}>
        <span className={noteStyle.date}>{date}</span>
        <span className={noteStyle.date}>
          Última modificação: {lastEditDate}
        </span>
      </div>

      {/* Botão para remover a nota */}
      <div className="flex flex-row justify-between items-center">
        <Button label="Explodir!" onAction={handleDelete} />
        <MdInvertColors
          onClick={handleChangeColor}
          size="2em"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  )
}

export default Note
export type { NoteProps }
