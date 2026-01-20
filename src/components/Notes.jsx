import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";

const Notes = () => {
  // used context from noteContexts
  const context = useContext(NoteContext);
  // Destructuring of notes and fetchnotes functions
  const { notes, fetchNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  // useEffect runs once when component mounts
  // It fetches all notes from the backend API
  useEffect(() => {
    fetchNotes();
  }, []);

  // Update note
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);

    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* Add note component  */}
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row my-3">
                  <div className="col">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Note Title"
                      aria-label="NoteTitle"
                      name="etitle"
                      id="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Tag for Note"
                      aria-label="Tag for Note"
                      name="etag"
                      id="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Note Description"
                      aria-label="Note Description"
                      name="edescription"
                      id="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Show all added notes by usinf Note Item component  */}
      <div className="container  row">
        <h2>Your Notes </h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {/* loop through an array of notes to render a notes  */}
        {notes.map((note) => {
          return (
            <NotesItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
