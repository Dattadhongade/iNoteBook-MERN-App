import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Aboute from "./components/Aboute";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <>
      <NoteState>
        <AlertState>
          <Header />
          <div className="container " style={{ marginTop: "5rem" }}>
            <Alert message="This is an alert" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Aboute" element={<Aboute />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
