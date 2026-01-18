import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, fetchNotes } = context;
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="container  row">
        <h2>Your Notes </h2>
        {notes.map((note) => {
          return <NotesItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
