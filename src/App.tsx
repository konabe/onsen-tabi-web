import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import Onsen from "./components/pages/OnsenDetail";

import styled from "styled-components";
import HotelList from "./components/pages/HotelList";
import OnsenList from "./components/pages/OnsenList";
function App() {
  const location = useLocation();
  return (
    <>
      <nav style={{ height: 40, backgroundColor: "grey" }}>
        <Link to="/">
          <SNavItem selected={location.pathname === "/"}>TOP</SNavItem>
        </Link>
        <Link to="/onsens">
          <SNavItem selected={location.pathname === "/onsens"}>
            温泉一覧
          </SNavItem>
        </Link>
        <Link to="/hotels">
          <SNavItem selected={location.pathname === "/hotels"}>
            ホテル一覧
          </SNavItem>
        </Link>
      </nav>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/hotels"} element={<HotelList />} />
        <Route path={"/hotel/:id"} element={<HotelDetail />} />
        <Route path={"/onsens"} element={<OnsenList />} />
        <Route path={"/onsen/:id"} element={<Onsen />} />
        <Route path={"/area/:id"} element={<Onsen />} />
      </Routes>
    </>
  );
}

const SNavItem = styled.button<{ selected: boolean }>`
  height: 100%;
  box-shadow: none;
  outline: none;
  border: none;
  color: white;
  padding: 0px 20px;
  background-color: ${({ selected }) => (selected ? "brown" : "grey")};

  &:hover {
    background-color: black;
  }
`;

export default App;
