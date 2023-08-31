import React, { useState } from "react";
import { postSignin } from "../../infrastructure/api/UserApiModel";
import { useNavigate } from "react-router-dom";
import TextField from "../atoms/TextField";
import { Button } from "../atoms/Button";

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
  const onClickSingoutButton = async () => {
    onChangeToken(undefined);
  };

  return (
    <div>
      <TextField
        label="メールアドレス"
        value={email}
        onChange={(v) => setEmail(v)}
        autoComplete="username"
      />
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
      <Button onClick={onClickSigninButton} title="ログイン" />
      <Button onClick={onClickSingoutButton} title="ログアウト" />
    </div>
  );
};

export default Signin;
