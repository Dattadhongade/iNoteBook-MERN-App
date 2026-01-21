import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  // ==================================== Fetch all Notes =================================//
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    setNotes(data);
  };
  // ============================================================================================//

  // ==================================== Add note function ====================================//
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      //  Convert note data to JSON before sending
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    // Convert server response into JavaScript object
    const data = await response.json();
    // Update state: add newly created note to notes array
    setNotes(notes.concat(data));
  };
  // ======================================================================================//

  // ============================== Edit Note ============================================//
  const editNote = async (id, title, description, tag) => {
    // Backend API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const json = await response.json();

    // ussed map to creae new array withoute using loop
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note,
      ),
    );
    // const json = await response.json();
    // console.log(json);
    // let newNotes = JSON.parse(JSON.stringify(notes));
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }
    // }
    // setNotes(newNotes);
  };
  // ============================================================================= //

  // =========================  Delete Note ===========================//
  const deleteNote = async (id) => {
    // fetch notes by id to delete
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    // Remove deleted note from current notes state
    // filter() keeps all notes except the one with matching id
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    // Update React state so UI updates instantly
    setNotes(newNotes);
  };
  // ================================================================================//

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
