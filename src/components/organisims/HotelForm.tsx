import { useState } from "react";
import styled from "styled-components";
import { postHotel } from "../../infrastructure/api/HotelApiModel";

const HotelForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [hasWashitsu, setHasWashitsu] = useState<boolean>(true);
  const [url, setURL] = useState<string>("");
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await postHotel({
      name,
      hasWashitsu,
      url,
    });
    setName("");
    setHasWashitsu(true);
    setURL("");
  };
  return (
    <SCreateCormContainer>
      <fieldset>
        <legend>ホテルの追加</legend>
        <div>
          <label>
            名前
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={hasWashitsu}
              onChange={() => setHasWashitsu((prevState) => !prevState)}
            />
            和室あり
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </label>
        </div>
        <button onClick={onClick}>送信</button>
      </fieldset>
    </SCreateCormContainer>
  );
};

export default HotelForm;

const SCreateCormContainer = styled.div`
  margin-top: 20px;
`;
