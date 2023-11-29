import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSpace from "./components/UserSpace";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:username" element={<UserSpace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
