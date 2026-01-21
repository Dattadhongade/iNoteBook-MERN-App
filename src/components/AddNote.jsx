import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";

const AddNote = () => {
  const { showAlert } = useContext(AlertContext);
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added Successfully", "success");
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
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Note Title"
                aria-label="NoteTitle"
                name="title"
                id="title"
                value={note.title}
                minLength={5}
                required
                onChange={onChange}
              />
            </div>
            <div className="col">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Tag for Note"
                aria-label="Tag for Note"
                name="tag"
                id="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control border border-dark"
                placeholder="Note Description"
                aria-label="Note Description"
                name="description"
                id="description"
                value={note.description}
                minLength={5}
                required
                onChange={onChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
