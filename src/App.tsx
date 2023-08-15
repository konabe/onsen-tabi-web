import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import Onsen from "./components/pages/OnsenDetail";

import styled from "styled-components";
import NavItem from "./components/molecules/NavItem";
import AreaDetail from "./components/pages/AreaDetail";
import HotelList from "./components/pages/HotelList";
import OnsenList from "./components/pages/OnsenList";
function App() {
  return (
    <>
      <SNav>
        <NavItem path="/" text="トップ" />
        <NavItem path="/onsens" text="温泉一覧" />
        <NavItem path="/hotels" text="ホテル一覧" />
      </SNav>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/hotels"} element={<HotelList />} />
        <Route path={"/hotel/:id"} element={<HotelDetail />} />
        <Route path={"/onsens"} element={<OnsenList />} />
        <Route path={"/onsen/:id"} element={<Onsen />} />
        <Route path={"/area/:id"} element={<AreaDetail />} />
      </Routes>
    </>
  );
}

const SNav = styled.nav`
  height: 40px;
  background-color: grey;
`;

export default App;
