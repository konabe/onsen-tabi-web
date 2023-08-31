import { useEffect, useState } from "react";
import styled from "styled-components";
import { HotelModel } from "../../share/hotel";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";
import TextField from "../atoms/TextField";

type Props = {
  value?: HotelModel;
  onChange?: (hotel: HotelModel) => void;
  onSubmitClick?: (hotel: HotelModel) => Promise<void>;
};

const HotelForm: React.FC<Props> = ({ value, onSubmitClick, onChange }) => {
  const [name, setName] = useState<string>("");
  const [hasWashitsu, setHasWashitsu] = useState<boolean>(true);
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onClick = async () => {
    await onSubmitClick?.({
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
      <SFieldSet>
        <legend>ホテルの追加</legend>
        <div>
          <TextField label="名前" value={name} onChange={(v) => setName(v)} />
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
          <TextField label="URL" value={url} onChange={(v) => setURL(v)} />
        </div>
        <div>
          <TextArea
            label="説明"
            value={description}
            onChange={async (e) => setDescription(e.target.value)}
          />
        </div>
        <Button title="送信" onClick={onClick} />
      </SFieldSet>
    </SCreateCormContainer>
  );
};

export default HotelForm;

const SCreateCormContainer = styled.div`
  margin-top: 20px;
`;

const SFieldSet = styled.fieldset`
  padding: 8px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
