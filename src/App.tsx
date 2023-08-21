import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import Onsen from "./components/pages/OnsenDetail";

import styled from "styled-components";
import NavItem from "./components/molecules/NavItem";
import AreaDetail from "./components/pages/AreaDetail";
import HotelList from "./components/pages/HotelList";
import OnsenList from "./components/pages/OnsenList";
import Signin from "./components/pages/Signin";
import axios from "axios";
import { getToken } from "./infrastructure/LocalStorage";

function App() {
  const isSignedIn = getToken() !== null;
  if (isSignedIn) {
    axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
  }
  return (
    <>
      <SNav>
        <SLeftNav>
          <NavItem path="/" text="トップ" />
          <NavItem path="/onsens" text="温泉一覧" />
          <NavItem path="/hotels" text="ホテル一覧" />
        </SLeftNav>
        <SRightNav>
          {isSignedIn ? (
            <NavItem path="/signin" text="ログアウト" />
          ) : (
            <NavItem path="/signin" text="管理者ログイン" />
          )}
        </SRightNav>
      </SNav>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/hotels"} element={<HotelList />} />
        <Route path={"/hotel/:id"} element={<HotelDetail />} />
        <Route path={"/onsens"} element={<OnsenList />} />
        <Route path={"/onsen/:id"} element={<Onsen />} />
        <Route path={"/area/:id"} element={<AreaDetail />} />
        <Route path={"/signin"} element={<Signin />} />
      </Routes>
    </>
  );
}

const SNav = styled.nav`
  height: 40px;
  background-color: grey;
`;

const SLeftNav = styled.div`
  float: left;
  height: 100%;
`;

const SRightNav = styled.div`
  float: right;
  height: 100%;
`;

export default App;
