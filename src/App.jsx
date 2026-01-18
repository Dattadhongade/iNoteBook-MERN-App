import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Aboute from "./components/Aboute";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Header />
        {/* <Aboute /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboute" element={<Aboute />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
