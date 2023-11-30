import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSpace from "./components/UserSpace";
import ShowData from "./components/ShowData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:username" element={<UserSpace />} />
          <Route path="/:username/:filename" element={<ShowData />} />
          <Route
            path="/:username/:directory/:filename"
            element={<ShowData />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
