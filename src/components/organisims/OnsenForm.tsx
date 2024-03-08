import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../atoms/Select";
import { OnsenEntity } from "../../domain/models/onsen";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";
import TextField from "../atoms/TextField";
import { subColor } from "../atoms/colors";
import SingleCheckBox from "../atoms/SingleCheckBox";
import { Liquid, LiquidValueOption } from "../../domain/models/onsen/liquid";
import { FormOption } from "../../domain/models/onsen/businessForm";
import { OsmoticPressureOption } from "../../domain/models/onsen/osmoticPressure";
import { ChemicalOption } from "../../domain/models/onsen/chemical";
import {
  Temperature,
  TemperatureOption,
} from "../../domain/models/onsen/temperature";

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
  const [osmoticPressure, setOsmoticPressure] = useState<
    OsmoticPressureOption | undefined
  >(undefined);
  const [liquid, setLiquid] = useState<LiquidValueOption | undefined>(
    undefined
  );
  const [temperature, setTemperature] = useState<TemperatureOption | undefined>(
    undefined
  );
  const [form, setForm] = useState<FormOption>("sotoyu");
  const [isDayUse, setIsDayUse] = useState<boolean>(false);
  const [url, setURL] = useState<string>("");
  const [imgURL, setImgURL] = useState<string>("");
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
    { value: "AlIon", label: "アルミニウムイオン" },
    { value: "CuIon", label: "銅イオン" },
    { value: "HIon", label: "水素イオン" },
    { value: "IIon", label: "ヨウ素イオン" },
    { value: "S", label: "硫黄" },
    { value: "Rn", label: "ラドン" },
    { value: "StrongNaCl", label: "(強塩化物)" },
    { value: "WeakRn", label: "(弱ラドン)" },
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
  const liquidValueOptions: {
    value: LiquidValueOption | undefined;
    label: string;
  }[] = [
    { value: undefined, label: "選択なし" },
    { value: "acidic", label: new Liquid("acidic").getTextWithInstruction() },
    {
      value: "mildly_acidic",
      label: new Liquid("mildly_acidic").getTextWithInstruction(),
    },
    { value: "neutral", label: new Liquid("neutral").getTextWithInstruction() },
    {
      value: "mildly_alkaline",
      label: new Liquid("mildly_alkaline").getTextWithInstruction(),
    },
    {
      value: "alkaline",
      label: new Liquid("alkaline").getTextWithInstruction(),
    },
  ];
  const temperatureOptions: {
    value: TemperatureOption | undefined;
    label: string;
  }[] = [
    { value: undefined, label: "選択なし" },
    { value: "hot", label: new Temperature("hot").getTextWithInstruction() },
    {
      value: "normal",
      label: new Temperature("normal").getTextWithInstruction(),
    },
    { value: "cool", label: new Temperature("cool").getTextWithInstruction() },
    { value: "cold", label: new Temperature("cold").getTextWithInstruction() },
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
  const osmoticPressureCurrentValue = osmoticPressureOptions.find(
    (v) => v.value === osmoticPressure
  );
  const liquidCurrentValue = liquidValueOptions.find((v) => v.value === liquid);
  const temperatureCurrentValue = temperatureOptions.find(
    (v) => v.value === temperature
  );
  const formCurrentValue = formOptions.find((v) => v.value === form);

  const onClick = async () => {
    await onSubmitClick?.(
      new OnsenEntity({
        id: -1,
        name,
        generatedSpringQuality: quality,
        userSpringQuality: userQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        osmoticPressure,
        liquid,
        temperature,
        form,
        isDayUse,
        url,
        imgURL: imgURL === "" ? null : imgURL,
        description,
      })
    );
    setName("");
    setUserQuality("");
    setQuality("");
    setChemicals([]);
    setOsmoticPressure(undefined);
    setLiquid(undefined);
    setTemperature(undefined);
    setForm("sotoyu");
    setURL("");
    setImgURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.(
      new OnsenEntity({
        id: -1,
        name,
        generatedSpringQuality: quality,
        userSpringQuality: userQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        osmoticPressure,
        liquid,
        temperature,
        form,
        isDayUse,
        url,
        imgURL: imgURL === "" ? null : imgURL,
        description,
      })
    );
  }, [
    description,
    form,
    isDayUse,
    osmoticPressure,
    liquid,
    temperature,
    name,
    onChange,
    userQuality,
    quality,
    url,
    chemicals,
  ]);

  useEffect(() => {
    setName(value?.name ?? "");
    setChemicals(value?.chemicals ?? []);
    setUserQuality(value?.userSpringQuality ?? "");
    setQuality(value?.generatedSprintQuality ?? "");
    setOsmoticPressure(value?.osmoticPressure);
    setLiquid(value?.liquid);
    setTemperature(value?.temperature);
    setForm(value?.form ?? "sotoyu");
    setIsDayUse(value?.isDayUse ?? false);
    setURL(value?.url ?? "");
    setImgURL(value?.imgURL ?? "");
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
            name="chemicals"
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
            name="osmotic-pressure"
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
            name="liquid"
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
            name="temperature"
            label="温度"
            options={temperatureOptions}
            value={temperatureCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setTemperature(v?.value as TemperatureOption | undefined)
            }
          />
        </div>
        <div>
          <Select
            name="form"
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
          <TextField
            label="画像URL"
            value={imgURL}
            onChange={(value) => setImgURL(value)}
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
