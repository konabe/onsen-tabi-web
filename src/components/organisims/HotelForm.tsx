import { useEffect, useState } from "react";
import styled from "styled-components";

import { HotelEntity } from "../../domain/models/hotel";
import Button from "../atoms/Button";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";
import TextArea from "../atoms/TextArea";
import TextField from "../atoms/TextField";

type Props = {
  formTitle?: string;
  value: HotelEntity | undefined;
  onChange?: (hotel: HotelEntity) => void;
  onSubmitClick?: (hotel: HotelEntity) => Promise<void>;
};

const HotelForm: React.FC<Props> = ({
  formTitle,
  value,
  onSubmitClick,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [hasWashitsu, setHasWashitsu] = useState<boolean>(true);
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onClick = async () => {
    await onSubmitClick?.({
      id: -1,
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
      id: -1,
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
        {formTitle !== undefined ? <legend>{formTitle}</legend> : undefined}
        <div>
          <TextField label="名前" value={name} onChange={(v) => setName(v)} />
        </div>
        <div>
          <SingleCheckBox
            label="和室あり"
            value={hasWashitsu}
            onChange={(v) => {
              setHasWashitsu(v);
            }}
          />
        </div>
        <div>
          <TextField label="URL" value={url} onChange={(v) => setURL(v)} />
        </div>
        <div>
          <TextArea
            label="説明"
            value={description}
            onChange={async (v) => setDescription(v)}
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
  border-color: ${subColor};
  padding: 16px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
