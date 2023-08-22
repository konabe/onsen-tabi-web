import React, { useState } from "react";
import { postSignin } from "../../infrastructure/api/UserApiModel";
import {
  deleteToken,
  getToken,
  setToken,
} from "../../infrastructure/LocalStorage";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await postSignin({ email, password });
    setToken(response.token);
    navigate("/");
  };

  const isSignedIn = getToken()?.length !== 0 ?? false;
  if (isSignedIn) {
    deleteToken();
  }
  return (
    <div>
      <label>
        email
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <button onClick={onClickButton}>ログイン</button>
    </div>
  );
};

export default Signin;
