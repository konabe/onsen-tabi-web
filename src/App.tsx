import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import Onsen from "./components/pages/OnsenDetail";
import headerCoverJpg from "./header_cover.jpg";
import styled from "styled-components";
import NavItem from "./components/molecules/NavItem";
import AreaDetail from "./components/pages/AreaDetail";
import HotelList from "./components/pages/HotelList";
import OnsenList from "./components/pages/OnsenList";
import Signin from "./components/pages/Signin";
import Error from "./components/pages/Error";
import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import { getToken, setToken } from "./infrastructure/LocalStorage";
import jwtDecode from "jwt-decode";

export type CommonPageProps = {
  isSignedIn?: boolean;
  onChangeToken?: (token: string) => void;
};

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const isSignedIn = accessToken !== undefined;
  const navigate = useNavigate();

  const onChangeToken = (token: string | undefined) => {
    setAccessToken(token);
    setToken(token);
  };

  useEffectOnce(() => {
    const token = getToken();
    if (token === undefined) {
      return;
    }
    const decoded: any = jwtDecode(token);
    const expiresDate = decoded.exp * 1000;
    if (expiresDate < new Date().getTime()) {
      setToken(undefined);
      setAccessToken(undefined);
      navigate("/signin");
      return;
    }
    setAccessToken(token);
  });

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
      <SHeader
        id="header"
        style={{ backgroundImage: `url(${headerCoverJpg})` }}
      >
        <SHeaderText>
          <SHeaderIcon src="/img/logo.png" alt="サイトアイコン" />
          静かに温泉旅がしたい！
        </SHeaderText>
      </SHeader>
      <SMain>
        <Routes>
          <Route path={"/"} element={<Home isSignedIn={isSignedIn} />} />
          <Route path={"/hotels"} element={<HotelList />} />
          <Route
            path={"/hotel/:id"}
            element={<HotelDetail isSignedIn={isSignedIn} />}
          />
          <Route path={"/onsens"} element={<OnsenList />} />
          <Route
            path={"/onsen/:id"}
            element={<Onsen isSignedIn={isSignedIn} />}
          />
          <Route
            path={"/area/:id"}
            element={<AreaDetail isSignedIn={isSignedIn} />}
          />
          <Route
            path={"/signin"}
            element={<Signin onChangeToken={onChangeToken} />}
          />
          <Route path={"/error"} element={<Error />} />
        </Routes>
      </SMain>
    </>
  );
};

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

const SHeader = styled.header`
  background-color: bisque;
  height: 30vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const SHeaderIcon = styled.img`
  vertical-align: bottom;
  height: 36px;
  margin-right: 8px;
  border-radius: 10px;

  @media screen and (max-width: 767px) {
    height: 24px;
    border-radius: 6px;
  }
`;

const SHeaderText = styled.div`
  color: white;
  background-color: rgba(1, 1, 1, 0.5);
  padding: 8px 16px;
  font-size: 36px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;

  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const SMain = styled.main`
  padding: 48px 80px;
  @media screen and (max-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export default App;
