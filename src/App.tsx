import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Hotel from "./components/pages/Hotel";
import Onsen from "./components/pages/Onsen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/hotel/:id"} element={<Hotel />} />
        <Route path={"/onsen/:id"} element={<Onsen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
