import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <h2>Add Note</h2>
        <form>
          <div className="row my-3">
            <div className="col">
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Note Title"
                aria-label="NoteTitle"
                name="title"
                id="title"
                onChange={onChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Note Description"
                aria-label="Note Description"
                name="description"
                id="description"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Tag for Note"
                aria-label="Tag for Note"
                name="tag"
                id="tag"
                onChange={onChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
