import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import Onsen from "./components/pages/OnsenDetail";
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
import NavBar from "./components/molecules/NavBar";
import Header from "./components/organisims/Header";

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
      <NavBar
        leftNav={
          <>
            <NavItem path="/" text="トップ" />
            <NavItem path="/onsens" text="温泉" />
            <NavItem path="/hotels" text="ホテル" />
          </>
        }
        rightNav={
          <>
            {isSignedIn ? (
              <NavItem path="/signin" text="ログアウト" />
            ) : (
              <NavItem path="/signin" text="管理者ログイン" />
            )}
          </>
        }
      />
      <Header />
      <SMain>
        <Routes>
          <Route path={"/"} element={<Home isSignedIn={isSignedIn} />} />
          <Route
            path={"/hotels"}
            element={<HotelList isSignedIn={isSignedIn} />}
          />
          <Route
            path={"/hotel/:id"}
            element={<HotelDetail isSignedIn={isSignedIn} />}
          />
          <Route
            path={"/onsens"}
            element={<OnsenList isSignedIn={isSignedIn} />}
          />
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

const SMain = styled.main`
  padding: 48px 80px;
  @media screen and (max-width: 767px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export default App;
