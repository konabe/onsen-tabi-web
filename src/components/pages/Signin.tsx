import React, { useState } from "react";
import { postSignin } from "../../infrastructure/api/UserApiModel";
import { useNavigate } from "react-router-dom";

type Props = {
  onChangeToken: (token: string | undefined) => void;
};

const Signin: React.FC<Props> = ({ onChangeToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClickSigninButton = async () => {
    const response = await postSignin({ email, password });
    onChangeToken(response.token);
    navigate("/");
  };
  const onClickSingoutButton = () => {
    onChangeToken(undefined);
  };

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
      <button onClick={onClickSigninButton}>ログイン</button>
      <button onClick={onClickSingoutButton}>ログアウト</button>
    </div>
  );
};

export default Signin;
