import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Hotel from "./components/pages/Hotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/hotel/:id"} element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
