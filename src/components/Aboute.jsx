import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

function Aboute() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  });
  return (
    <div>
      <h1>
        Welcome to aboute section {a.state.name} and he is in class{" "}
        {a.state.class}{" "}
      </h1>
    </div>
  );
}

export default Aboute;
