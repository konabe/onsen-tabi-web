import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import {
  FormOption,
  LiquidValueOption,
  OnsenModel,
  OsmoticPressureOption,
} from "../../share/onsen";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";
import TextField from "../atoms/TextField";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";

type Props = {
  formTitle?: string;
  value?: OnsenModel;
  onChange?: (onsen: OnsenModel) => void;
  onSubmitClick?: (onsen: OnsenModel) => Promise<void>;
};

const OnsenForm: React.FC<Props> = ({
  formTitle,
  value,
  onSubmitClick,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [liquid, setLiquid] = useState<LiquidValueOption | undefined>(
    undefined
  );
  const [osmoticPressure, setOsmoticPressure] = useState<
    OsmoticPressureOption | undefined
  >(undefined);
  const [form, setForm] = useState<FormOption>("sotoyu");
  const [isDayUse, setIsDayUse] = useState<boolean>(false);
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

  const liquidCurrentValue = liquidValueOptions.find((v) => v.value === liquid);
  const osmoticPressureCurrentValue = osmoticPressureOptions.find(
    (v) => v.value === osmoticPressure
  );
  const formCurrentValue = formOptions.find((v) => v.value === form);

  const onClick = async () => {
    await onSubmitClick?.({
      name,
      springQuality: quality,
      liquid: liquid !== undefined ? liquid : null,
      osmoticPressure: osmoticPressure !== undefined ? osmoticPressure : null,
      form,
      isDayUse,
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

  useEffect(() => {
    onChange?.({
      name,
      springQuality: quality,
      liquid: liquid !== undefined ? liquid : null,
      osmoticPressure: osmoticPressure !== undefined ? osmoticPressure : null,
      form,
      isDayUse,
      url,
      description,
    });
  }, [
    description,
    form,
    isDayUse,
    liquid,
    name,
    onChange,
    osmoticPressure,
    quality,
    url,
  ]);

  useEffect(() => {
    setName(value?.name ?? "");
    setQuality(value?.springQuality ?? "");
    setLiquid(value?.liquid != null ? value.liquid : undefined);
    setOsmoticPressure(
      value?.osmoticPressure != null ? value.osmoticPressure : undefined
    );
    setForm(value?.form ?? "sotoyu");
    setIsDayUse(value?.isDayUse ?? false);
    setURL(value?.url ?? "");
    setDescription(value?.description ?? "");
  }, [value]);

  return (
    <SCreateCormContainer>
      <SFieldSet>
        {formTitle !== undefined ? <legend>{formTitle}</legend> : undefined}
        <div>
          <TextField
            label="名前"
            value={name}
            onChange={(value) => setName(value)}
          />
        </div>
        <div>
          <TextField
            label="泉質"
            value={quality}
            onChange={(value) => setQuality(value)}
          />
        </div>
        <div>
          <Select
            label="液性"
            options={liquidValueOptions}
            value={liquidCurrentValue}
            defaultValue={undefined}
            onChange={(v) => setLiquid(v?.value)}
          />
        </div>
        <div>
          <Select
            label="浸透圧"
            options={osmoticPressureOptions}
            value={osmoticPressureCurrentValue}
            defaultValue={undefined}
            onChange={(v) => setOsmoticPressure(v?.value)}
          />
        </div>
        <div>
          <Select
            label="形態"
            options={formOptions}
            value={formCurrentValue}
            defaultValue={formOptions[0]}
            onChange={(v) => setForm(v?.value ?? "sotoyu")}
          />
        </div>
        <div>
          <SingleCheckBox
            label="日帰り入力あり"
            value={isDayUse}
            onChange={(v) => setIsDayUse(v)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            value={url}
            onChange={(value) => setURL(value)}
          />
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

export default OnsenForm;

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
