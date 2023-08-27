import { useEffect, useState } from "react";
import styled from "styled-components";
import { HotelModel } from "../../share/hotel";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";

type Props = {
  value?: HotelModel;
  onChange?: (hotel: HotelModel) => void;
  onSubmitClick?: (hotel: HotelModel) => void;
};

const HotelForm: React.FC<Props> = ({ value, onSubmitClick, onChange }) => {
  const [name, setName] = useState<string>("");
  const [hasWashitsu, setHasWashitsu] = useState<boolean>(true);
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onClick = async () => {
    onSubmitClick?.({
      name,
      hasWashitsu,
      url,
      description,
    });
    setName("");
    setHasWashitsu(true);
    setURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.({
      name,
      hasWashitsu,
      url,
      description,
    });
  }, [description, hasWashitsu, name, onChange, url]);

  useEffect(() => {
    setName(value?.name ?? "");
    setHasWashitsu(value?.hasWashitsu ?? true);
    setURL(value?.url ?? "");
    setDescription(value?.description ?? "");
  }, [value]);

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
        <div>
          <label>
            説明
            <TextArea
              value={description}
              onChange={async (e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <Button title="送信" onClick={onClick} />
      </fieldset>
    </SCreateCormContainer>
  );
};

export default HotelForm;

const SCreateCormContainer = styled.div`
  margin-top: 20px;
`;
