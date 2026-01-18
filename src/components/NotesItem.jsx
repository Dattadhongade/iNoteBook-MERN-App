import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
  const { note } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
        </div>
        <div className="d-flex justify-content-end my-1">
          <i className="bi bi-pencil-square "></i>
          <i
            className="bi bi-trash3-fill mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
