import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Aboute from "./components/Aboute";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Header />

        <div className="container  " style={{ marginTop: "5rem" }}>
          <Alert message="This is an alert" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Aboute" element={<Aboute />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
