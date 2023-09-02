import { useEffect, useState } from "react";
import styled from "styled-components";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";
import TextField from "../atoms/TextField";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";
import { AreaModel } from "../../share/area";

type Props = {
  formTitle?: string;
  value?: AreaModel;
  onChange?: (area: AreaModel) => void;
  onSubmitClick?: (area: AreaModel) => Promise<void>;
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
    await onSubmitClick?.({
      name,
      prefecture,
      nationalResort,
      village: villageResult,
      url,
      description,
    });
    setName("");
    setPrefecture("");
    setNationalResort(false);
    setVillage("");
    setURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.({
      name,
      prefecture,
      nationalResort,
      village,
      url,
      description,
    });
  }, [description, nationalResort, village, prefecture, name, onChange, url]);

  useEffect(() => {
    setName(value?.name ?? "");
    setPrefecture(value?.prefecture ?? "");
    setNationalResort(value?.nationalResort ?? false);
    setVillage(value?.village ?? "");
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
            onChange={async (v) => setDescription(v.target.value)}
          />
        </div>
        <Button title="送信" onClick={onClick} />
      </SFieldSet>
    </SCreateCormContainer>
  );
};

export default AreaForm;

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
