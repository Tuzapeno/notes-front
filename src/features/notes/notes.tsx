import Greetings from "@/components/Greetings"
import NoteGrid from "@/components/NoteGrid/NoteGrid"
import { selectUser } from "../auth/authSlice"
import { useSelector } from "react-redux"

function Notes() {
  const username = useSelector(selectUser)

  return (
    <div>
      <div className="flex flex-col">
        <Greetings text={"Bem vindo " + username} />
        <NoteGrid />
      </div>
    </div>
  )
}

export default Notes
