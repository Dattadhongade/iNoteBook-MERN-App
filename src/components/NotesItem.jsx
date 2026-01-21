import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";

const NotesItem = (props) => {
  const { showAlert } = useContext(AlertContext);
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  // called delete note function
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">tag : {note.tag} </p>
          <p className="card-text">{note.description} </p>
        </div>
        <div className="d-flex justify-content-end my-1">
          <i
            className="bi bi-pencil-square "
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i
            className="bi bi-trash3-fill mx-2"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Note deleted Successfully", "success");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
