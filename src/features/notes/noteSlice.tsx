import { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { NoteProps } from "@components/Note/Note"

interface NoteState {
  notes: NoteProps[]
  nextID: number
}

// Ajustar para o nextID ter o valor correto quando puxarmos as notas do bckend

const initialState: NoteState = {
  notes: [],
  nextID: 0,
}

const NoteSlice = createAppSlice({
  name: "note",
  initialState: initialState,
  reducers: create => ({
    addNote: create.reducer((state, action: PayloadAction<NoteProps>) => {
      const note: NoteProps = { ...action.payload, id: state.nextID }
      state.nextID++
      state.notes.push(note)
    }),
    removeNote: create.reducer(
      (state, action: PayloadAction<number | undefined>) => {
        if (action.payload === undefined) {
          return
        }
        state.notes = state.notes.filter(note => note.id !== action.payload)
      },
    ),
  }),
  selectors: {
    selectNotes: state => state.notes,
  },
})
export const { addNote, removeNote } = NoteSlice.actions

export const { selectNotes } = NoteSlice.selectors

export default NoteSlice
