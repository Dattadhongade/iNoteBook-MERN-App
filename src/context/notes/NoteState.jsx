import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);
  // Fetch all Notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2YTExMzBlOTg3MWZmNmYzMWU0YzI4In0sImlhdCI6MTc2ODU1ODg5Nn0.oxKOoq3GrbGHkgQ0pXD2zc9ENN1sZ1HDj9y_POWF4qw",
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  // Add note function
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2YTExMzBlOTg3MWZmNmYzMWU0YzI4In0sImlhdCI6MTc2ODU1ODg5Nn0.oxKOoq3GrbGHkgQ0pXD2zc9ENN1sZ1HDj9y_POWF4qw",
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const data = await response.json();
    console.log("Added Note:", data);

    const note = {
      _id: "696b2c6788cb8ae07ab2857d",
      user: "696a1130e9871ff6f31e4c28",
      title: title,
      description: description,
      tag: tag,
      date: "2026-01-17T06:29:59.252Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // Backend API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2YTExMzBlOTg3MWZmNmYzMWU0YzI4In0sImlhdCI6MTc2ODU1ODg5Nn0.oxKOoq3GrbGHkgQ0pXD2zc9ENN1sZ1HDj9y_POWF4qw",
      },
      body: JSON.stringify(data),
    });
    const data = await response.json();
    console.log("Added Note:", data);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    // fetch notes by id to delete
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2YTExMzBlOTg3MWZmNmYzMWU0YzI4In0sImlhdCI6MTc2ODU1ODg5Nn0.oxKOoq3GrbGHkgQ0pXD2zc9ENN1sZ1HDj9y_POWF4qw",
      },
    });
    const data = await response.json();
    console.log("Deleting the note with id", data);
    // Remove deleted note from current notes state
    // filter() keeps all notes except the one with matching id
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    // Update React state so UI updates instantly
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
