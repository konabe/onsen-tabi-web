import { useEffect, useState } from "react";
import styled from "styled-components";

import { AreaEntity } from "../../domain/models/area";
import Button from "../atoms/Button";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";
import TextArea from "../atoms/TextArea";
import TextField from "../atoms/TextField";

type Props = {
  formTitle?: string;
  value: AreaEntity | undefined;
  onChange?: (area: AreaEntity) => void;
  onSubmitClick?: (area: AreaEntity) => Promise<void>;
};

const AreaForm: React.FC<Props> = ({
  formTitle,
  value,
  onSubmitClick,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [prefecture, setPrefecture] = useState<string>("");
  const [nationalResort, setNationalResort] = useState<boolean>(false);
  const [village, setVillage] = useState<string>();
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onClick = async () => {
    const villageResult: string | undefined =
      village === "" ? undefined : village;
    await onSubmitClick?.(
      new AreaEntity({
        id: -1,
        name,
        prefecture,
        nationalResort,
        village: villageResult,
        url,
        description,
        onsenIds: [],
      })
    );
    setName("");
    setPrefecture("");
    setNationalResort(false);
    setVillage("");
    setURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.({
      id: -1,
      name,
      prefecture,
      isNationalResort: nationalResort,
      village,
      url,
      description,
      onsenIds: [],
    });
  }, [description, nationalResort, village, prefecture, name, onChange, url]);

  useEffect(() => {
    setName(value?.name ?? "");
    setPrefecture(value?.prefecture ?? "");
    setNationalResort(value?.isNationalResort ?? false);
    setVillage(value?.village ?? "");
    setURL(value?.url ?? "");
    setDescription(value?.description ?? "");
  }, [value]);

  return (
    <div>
      <SFieldSet>
        {formTitle !== undefined ? <legend>{formTitle}</legend> : undefined}
        <div>
          <TextField label="名前" value={name} onChange={(v) => setName(v)} />
        </div>
        <div>
          <TextField
            label="都道府県"
            value={prefecture}
            onChange={(v) => setPrefecture(v)}
          />
        </div>
        <div>
          <TextField
            label="温泉郷"
            value={village ?? ""}
            onChange={(v) => setVillage(v)}
          />
        </div>
        <div>
          <TextField label="URL" value={url} onChange={(v) => setURL(v)} />
        </div>
        <div>
          <SingleCheckBox
            label="国民保養温泉地"
            value={nationalResort}
            onChange={(v) => {
              setNationalResort(v);
            }}
          />
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
    </div>
  );
};

export default AreaForm;

const SFieldSet = styled.fieldset`
  border-color: ${subColor};
  padding: 16px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
