import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Note, { type NoteProps } from "@components/Note/Note";
import { fetchNotes, selectNotes } from "@/features/notes/noteSlice";
import Button from "@components/Button/Button";

import { addNote, setNotes } from "@/features/notes/noteSlice";

import gridStyle from "./NoteGrid.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectId } from "@/features/auth/authSlice";
import { ApiDoSaveNotes } from "@/features/api/api";

const NoteGrid = () => {
  const notes = useAppSelector(selectNotes);
  const userId = useSelector(selectId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes())
      .unwrap()
      .then((result) => {
        console.log("Fetched notes:", result);
        dispatch(setNotes(result));
      })
      .catch((error) => {
        console.error("Failed to fetch notes:", error);
      });
  }, [dispatch]);

  const handleNoteAdd = () => {
    dispatch(
      addNote({
        title: "",
        description: "",
        date: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      }),
    );
  };

  const handleNoteSave = async () => {
    if (notes.length === 0) {
      alert("No notes to save");
      return;
    }

    if (!userId) {
      alert("User ID not found");
      return;
    }

    const response = await ApiDoSaveNotes(notes, userId);

    if (response?.status !== 200) {
      alert("Problem while saving notes");
      return;
    }

    alert("Notes saved successfully");
  };

  return (
    <>
      <div className={gridStyle.background_container}>
        <div className="grid grid-cols-4 px-20 gap-y-10 place-items-center">
          {notes.map((note: NoteProps) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              description={note.description}
              date={note.date}
              initialColor={note.initialColor}
            />
          ))}
          <div className="px-28 py-38 border-2 border-dashed border-black-300 rounded-md">
            <Button label="+" onAction={handleNoteAdd} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button label="Salvar" onAction={handleNoteSave} />
      </div>
    </>
  );
};

export default NoteGrid;
