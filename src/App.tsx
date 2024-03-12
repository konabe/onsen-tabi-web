import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import NavBar from "./components/molecules/NavBar";
import NavItem from "./components/molecules/NavItem";
import Header from "./components/organisims/Header";
import AreaDetail from "./components/pages/AreaDetail";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import HotelDetail from "./components/pages/HotelDetail";
import HotelList from "./components/pages/HotelList";
import Onsen from "./components/pages/OnsenDetail";
import OnsenList from "./components/pages/OnsenList";
import Signin from "./components/pages/Signin";
import { getToken, setToken } from "./infrastructure/LocalStorage";
import { AreaRepository } from "./infrastructure/repositories/areaRepository";
import { HotelRepository } from "./infrastructure/repositories/hotelRepository";
import { OnsenRepository } from "./infrastructure/repositories/onsenRepository";
import { UserRepository } from "./infrastructure/repositories/userRepository";

export type CommonPageProps = {
  isSignedIn?: boolean;
  onChangeToken?: (token: string) => void;
};

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const isSignedIn = accessToken !== undefined;
  const navigate = useNavigate();
  const areaRepository = new AreaRepository();
  const onsenRepository = new OnsenRepository();
  const hotelRepository = new HotelRepository();
  const userRepository = new UserRepository();

  const onChangeToken = (token: string | undefined) => {
    setAccessToken(token);
    setToken(token);
  };

  useEffectOnce(() => {
    const token = getToken();
    if (token === undefined) {
      return;
    }
    const decoded = jwtDecode(token);
    const expiresDate = (decoded?.exp ?? 0) * 1000;
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
          <Route
            path={"/"}
            element={
              <Home
                isSignedIn={isSignedIn}
                dependencies={{
                  areaRepository,
                }}
              />
            }
          />
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
            element={
              <Onsen
                isSignedIn={isSignedIn}
                dependencies={{ onsenRepository }}
              />
            }
          />
          <Route
            path={"/area/:id"}
            element={
              <AreaDetail
                isSignedIn={isSignedIn}
                dependencies={{
                  areaRepository,
                  hotelRepository,
                  onsenRepository,
                }}
              />
            }
          />
          <Route
            path={"/signin"}
            element={
              <Signin
                onChangeToken={onChangeToken}
                dependencies={{ userRepository }}
              />
            }
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
