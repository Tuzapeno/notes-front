import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { NoteProps } from "@components/Note/Note";
import { selectAccessToken, selectId } from "../auth/authSlice";
import { RootState } from "../../app/store";
import AxiosInstance from "../api/api";

interface NoteState {
  notes: NoteProps[];
  nextID: number;
}

export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = selectAccessToken(state);
    const userId = selectId(state);

    if (!token) {
      return rejectWithValue("Authentication token not found.");
    }

    try {
      const response = await AxiosInstance.post("/getNotes", {
        user_id: userId,
      });

      return response.data.notes;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch notes");
    }
  },
);

const initialState: NoteState = {
  notes: [],
  nextID: 0,
};

const NoteSlice = createAppSlice({
  name: "note",
  initialState: initialState,
  reducers: (create) => ({
    addNote: create.reducer((state, action: PayloadAction<NoteProps>) => {
      const note: NoteProps = { ...action.payload, id: state.nextID };
      state.nextID++;
      state.notes.push(note);
    }),
    removeNote: create.reducer(
      (state, action: PayloadAction<number | undefined>) => {
        if (action.payload === undefined) {
          return;
        }
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      },
    ),
    setNotes: create.reducer((state, action: PayloadAction<NoteProps[]>) => {
      state.notes = action.payload;
    }),
    updateNote: create.reducer((state, action: PayloadAction<NoteProps>) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    }),
  }),
  selectors: {
    selectNotes: (state) => state.notes,
  },
});

export const { addNote, removeNote, setNotes, updateNote } = NoteSlice.actions;

export const { selectNotes } = NoteSlice.selectors;

export default NoteSlice;
