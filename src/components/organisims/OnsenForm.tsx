import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import { OnsenEntity } from "../../domain/models/onsen";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";
import TextField from "../atoms/TextField";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";
import { LiquidValueOption } from "../../domain/models/onsen/liquid";
import { FormOption } from "../../domain/models/onsen/businessForm";
import { OsmoticPressureOption } from "../../domain/models/onsen/osmoticPressure";
import { ChemicalOption } from "../../domain/models/onsen/chemical";

type Props = {
  formTitle?: string;
  value?: OnsenEntity;
  onChange?: (onsen: OnsenEntity) => void;
  onSubmitClick?: (onsen: OnsenEntity) => Promise<void>;
};

const OnsenForm: React.FC<Props> = ({
  formTitle,
  value,
  onSubmitClick,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [userQuality, setUserQuality] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [chemicals, setChemicals] = useState<string[]>([]);
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

  const chemicalsValueOptions: {
    value: ChemicalOption;
    label: string;
  }[] = [
    { value: "NaIon", label: "ナトリウムイオン" },
    { value: "CaIon", label: "カルシウムイオン" },
    { value: "MgIon", label: "マグネシウムイオン" },
    { value: "ClIon", label: "塩化物イオン" },
    { value: "HCO3Ion", label: "炭酸水素イオン" },
    { value: "SO4Ion", label: "硫酸イオン" },
    { value: "CO2", label: "二酸化炭素" },
    { value: "FeIon", label: "鉄イオン" },
    { value: "HIon", label: "水素イオン" },
    { value: "IIon", label: "ヨウ素イオン" },
    { value: "S", label: "硫黄" },
    { value: "Rn", label: "ラドン" },
  ];
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

  const chemicalsCurrentValue = chemicals?.map((v) =>
    chemicalsValueOptions.find((c) => c.value === v)
  );
  const liquidCurrentValue = liquidValueOptions.find((v) => v.value === liquid);
  const osmoticPressureCurrentValue = osmoticPressureOptions.find(
    (v) => v.value === osmoticPressure
  );
  const formCurrentValue = formOptions.find((v) => v.value === form);

  const onClick = async () => {
    await onSubmitClick?.(
      new OnsenEntity({
        id: -1,
        name,
        springQuality: quality,
        springQualityUser: userQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        liquid: liquid !== undefined ? liquid : undefined,
        osmoticPressure:
          osmoticPressure !== undefined ? osmoticPressure : undefined,
        form,
        isDayUse,
        url,
        description,
      })
    );
    setName("");
    setUserQuality("");
    setQuality("");
    setChemicals([]);
    setLiquid(undefined);
    setOsmoticPressure(undefined);
    setForm("sotoyu");
    setURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.(
      new OnsenEntity({
        id: -1,
        name,
        springQuality: quality,
        springQualityUser: userQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        liquid: liquid !== undefined ? liquid : undefined,
        osmoticPressure:
          osmoticPressure !== undefined ? osmoticPressure : undefined,
        form,
        isDayUse,
        url,
        description,
      })
    );
  }, [
    description,
    form,
    isDayUse,
    liquid,
    name,
    onChange,
    osmoticPressure,
    userQuality,
    quality,
    url,
    chemicals,
  ]);

  useEffect(() => {
    setName(value?.name ?? "");
    setChemicals(value?.chemicals ?? []);
    setUserQuality(value?.springQualityUser ?? "");
    setQuality(value?.springQuality ?? "");
    setLiquid(value?.liquid !== undefined ? value.liquid : undefined);
    setOsmoticPressure(
      value?.osmoticPressure !== undefined ? value.osmoticPressure : undefined
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
            value={userQuality}
            onChange={(value) => setUserQuality(value)}
          />
        </div>
        <div>
          <Select
            label="成分"
            options={chemicalsValueOptions}
            value={chemicalsCurrentValue}
            isMulti={true}
            defaultValue={[]}
            onChange={(v) => setChemicals(v.map((c: any) => c.value))}
          />
        </div>
        <div>
          <Select
            label="液性"
            options={liquidValueOptions}
            value={liquidCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setLiquid(v?.value as LiquidValueOption | undefined)
            }
          />
        </div>
        <div>
          <Select
            label="浸透圧"
            options={osmoticPressureOptions}
            value={osmoticPressureCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setOsmoticPressure(v?.value as OsmoticPressureOption | undefined)
            }
          />
        </div>
        <div>
          <Select
            label="形態"
            options={formOptions}
            value={formCurrentValue}
            isMulti={false}
            defaultValue={formOptions[0]}
            onChange={(v) => setForm(v.value as FormOption)}
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
