import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Note, { type NoteProps } from "@components/Note/Note"
import { selectNotes } from "@/features/notes/noteSlice"
import Button from "@components/Button/Button"

import { addNote } from "@/features/notes/noteSlice"

import gridStyle from "./NoteGrid.module.css"

const NoteGrid = () => {
  const notes = useAppSelector(selectNotes)
  const dispatch = useAppDispatch()

  const handleNoteAdd = () => {
    dispatch(
      addNote({
        title: "",
        description: "",
        date: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      }),
    )
  }

  return (
    <div className={gridStyle.background_container}>
      <div className="grid grid-cols-4 px-20 gap-y-10 place-items-center">
        {notes.map((note: NoteProps) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
          />
        ))}
        <div className="px-28 py-38 border-2 border-dashed border-black-300 rounded-md">
          <Button label="+" onAction={handleNoteAdd} />
        </div>
      </div>
    </div>
  )
}

export default NoteGrid
