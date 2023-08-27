import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import {
  FormOption,
  LiquidValueOption,
  OnsenModel,
  OsmoticPressureOption,
} from "../../share/onsen";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";

type Props = {
  onSubmitClick?: (onsen: OnsenModel) => void;
};

const OnsenForm: React.FC<Props> = ({ onSubmitClick }) => {
  const [name, setName] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [liquid, setLiquid] = useState<LiquidValueOption | undefined>(
    undefined
  );
  const [osmoticPressure, setOsmoticPressure] = useState<
    OsmoticPressureOption | undefined
  >(undefined);
  const [form, setForm] = useState<FormOption>("sotoyu");
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const liquidValueOptions: {
    value: LiquidValueOption | undefined;
    label: string;
  }[] = [
    { value: undefined, label: "選択なし" },
    { value: "acidic", label: "酸性" },
    { value: "mildly_acidic", label: "弱酸性" },
    { value: "neutral", label: "中性" },
    { value: "mildly_alkaline", label: "弱アルカリ性" },
    { value: "alkaline", label: "アルカリ性" },
  ];
  const osmoticPressureOptions: {
    value: OsmoticPressureOption | undefined;
    label: string;
  }[] = [
    { value: undefined, label: "選択なし" },
    { value: "hypotonic", label: "低張性" },
    { value: "isotonic", label: "等張性" },
    { value: "hypertonic", label: "高張性" },
  ];
  const formOptions: {
    value: FormOption;
    label: string;
  }[] = [
    { value: "sotoyu", label: "外湯" },
    { value: "uchiyu", label: "内湯" },
  ];

  const onClick = async () => {
    onSubmitClick?.({
      name,
      springQuality: quality,
      liquid: liquid !== undefined ? liquid : null,
      osmoticPressure: osmoticPressure !== undefined ? osmoticPressure : null,
      form,
      url,
      description,
    });
    setName("");
    setQuality("");
    setLiquid(undefined);
    setOsmoticPressure(undefined);
    setForm("sotoyu");
    setURL("");
    setDescription("");
  };
  return (
    <SCreateCormContainer>
      <fieldset>
        <legend>温泉の追加</legend>
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
            泉質
            <input
              type="text"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            液性
            <Select
              options={liquidValueOptions}
              defaultValue={undefined}
              onChange={(v) => setLiquid(v?.value)}
            />
          </label>
        </div>
        <div>
          <label>
            浸透圧
            <Select
              options={osmoticPressureOptions}
              defaultValue={undefined}
              onChange={(v) => setOsmoticPressure(v?.value)}
            />
          </label>
        </div>
        <div>
          <label>
            形態
            <Select
              options={formOptions}
              defaultValue={formOptions[0]}
              onChange={(v) => setForm(v?.value ?? "sotoyu")}
            />
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

export default OnsenForm;

const SCreateCormContainer = styled.div`
  margin-top: 20px;
`;
