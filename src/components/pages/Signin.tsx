import React, { useState } from "react";
import { postSignin } from "../../infrastructure/api/UserApiModel";
import { useNavigate } from "react-router-dom";
import TextField from "../atoms/TextField";
import Button from "../atoms/Button";
import styled from "styled-components";

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
      <TextField
        label="パスワード"
        value={password}
        onChange={(v) => setPassword(v)}
        isPassword={true}
      />
      <SButtons>
        <Button onClick={onClickSigninButton} title="ログイン" />
        <Button onClick={onClickSingoutButton} title="ログアウト" />
      </SButtons>
    </div>
  );
};

const SButtons = styled.div`
  margin-top: 8px;
  display: flex;
  column-gap: 8px;
`;

export default Signin;
